const mysql = require("./mysqlConnect");

get= async (query)=>{
    if(query){
        query = JSON.parse(query);
        sql= "SELECT ";
        if(query.select.date){
            sql+="date, ";
        }
        if(query.select.description){
            sql+="description, ";
        }
        if(query.select.value){
            sql+="value, ";
        }
        if(query.select.type){
            sql+="type, ";
        }
    
        sql=sql.substring(0, sql.length - 2);//remover dois ultimos caracter da string
    }else{
        sql="SELECT * "
    }
    sql+=" FROM moviment"
    /*
    if(query.where){
        sql+=" WHERE"
        query.where.forEach(item =>{
            sql+=" "+item.campo+" "+item.operador.replace('/', '')+" '"+item.value+"' AND";
        })
        sql=sql.substring(0, sql.length - 3);//remover utilmo segmento 'END' da string
    } */
    return await  mysql.query(sql);
}

post= async (date, idUser)=>{
    sql="INSERT INTO moviment"
    +" (description, date, value, user_id, type)"
    +" VALUES "
    +"('"+date.description+"', '"+date.date+"', "+date.value+", "+idUser+", '"+date.type+"')";
    const result = await  mysql.query(sql);
    if(result){
        resp={"status":"OK",insertId:result.insertId};
    }else{
        resp={"status":"Error",insertId:result.insertId};
    }
    return resp;
 }

 put= async (date, idUser)=>{
     sql="UPDATE moviments SET "
     +"description='"+date.description+"', date= '"+date.date+"', value="+date.value+", user_id="+idUser+", type='"+date.type+"'" 
     +" WHERE id= "+date.id
    const result = await  mysql.query(sql);
    resp=null;
    if(result){
        resp={"status":"OK"};
    }
    return resp;
 }

 remove = async (idMov, idUser)=>{
    sql="DELETE INTO moviments"
    +" WHERE id="+idMov;
    const result = await  mysql.query(sql);
    resp=null;
    if(result){
        resp={"status":"OK"};
    }
    return resp;
 }

 get= async (query)=>{
    if(query){
        query = JSON.parse(query);
        sql= "SELECT ";
        if(query.select.date){
            sql+="date, ";
        }
        if(query.select.description){
            sql+="description, ";
        }
        if(query.select.value){
            sql+="value, ";
        }
        if(query.select.type){
            sql+="type, ";
        }
    
        sql=sql.substring(0, sql.length - 2);//remover dois ultimos caracter da string
    }else{
        sql="SELECT * "
    }
    sql+=" FROM moviment"
    /*
    if(query.where){
        sql+=" WHERE"
        query.where.forEach(item =>{
            sql+=" "+item.campo+" "+item.operador.replace('/', '')+" '"+item.value+"' AND";
        })
        sql=sql.substring(0, sql.length - 3);//remover utilmo segmento 'END' da string
    } */
    return await  mysql.query(sql);
}


cashbalance = async () =>{
    input = await mysql.query ("SELECT sum(value) AS input FROM moviment WHERE type='input'")
    output = await mysql.query("SELECT sum(value) AS output FROM moviment WHERE type='output'")
    console.log(input )
    cash = parseFloat(input[0].input) - parseFloat(output[0].output);
    console.log(cash)
    result = null;
    if (input && output) {
        result = {
            cashbalance: cash,
            input: input,
            output: output
        };
    }
   
    return result
}

io = async()=>{
    return await mysql.query("SELECT DISTINCT date, (SELECT SUM(value) FROM moviment WHERE type='input' AND date=m.date) AS input,(SELECT SUM(value) FROM moviment WHERE type='output' AND date=m.date) AS output FROM moviment m;")
}

ioYearMonth = async(data)=>{
    input = await mysql.query(`SELECT *  FROM moviment WHERE type='input' AND YEAR(date)=${data.year} AND MONTH(date)=${data.month} `)
    output = await mysql.query(`SELECT *  FROM moviment WHERE type='output' AND YEAR(date)=${data.year} AND MONTH(date)=${data.month} `)
   
    result = null
    if (input && output) {
        result = {
            input: input,
            output: output
        };
    }
    
    return result
}

ioYearMonthMonth = async(data)=>{
    input = await mysql.query(`SELECT * FROM moviment WHERE type='input' AND YEAR(date)=${data.year} AND MONTH(date) BETWEEN ${data.month} AND ${data.secondmonth} `)
    output = await mysql.query(`SELECT * FROM moviment WHERE type='output' AND YEAR(date)=${data.year} AND MONTH(date) BETWEEN ${data.month} AND ${data.secondmonth} `)
    result = null;
    if (input && output) {
        result = {
            input: input,
            output: output
        };
    }
   
    return result
}

yearMonth = async(data)=>{
    console.log(data)
    return await mysql.query(`SELECT date, description, value, type FROM moviment WHERE YEAR(date)= ${data.year} AND MONTH(date)=${data.month} `)
}
module.exports= {get,post, put, remove, cashbalance, io, ioYearMonth, ioYearMonthMonth, yearMonth}