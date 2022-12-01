const movimentoModel = require('../models/movimentModel');

exports.post=async(data,idUser)=>{
    return await movimentoModel.post(data, idUser);
}
exports.get=async(query)=>{
    return await movimentoModel.get(query);   
}

exports.put=async(req,res)=>{
    return await movimentoModel.put(data, idUser);
}
exports.delete=async(id)=>{
    return await movimentoModel.delete(id,idUser);
}

exports.cashbalance=async()=>{
    return await movimentoModel.cashbalance();
}

exports.io=async()=>{
    return await movimentoModel.io();
}

exports.ioYearMonth=async(data)=>{
    return await movimentoModel.ioYearMonth(data);
}


exports.ioYearMonthMonth=async(data)=>{
    return await movimentoModel.ioYearMonthMonth(data);
}


exports.yearMonth=async(data)=>{
    return await movimentoModel.yearMonth(data);
}