import giaonhan from '../baseUrl2';

// const data = {
//     macongty: 'HOPLONG',
//     username: 'WALO032_HL',
//     isadmin: false,
//     maphongban: '',       
// }

export const _getCanNhan = async (data) => {    
    const response = await giaonhan.post('/api/Api_GiaoHang/TongSoDonHangCuaToi',data);
    return response.data;
};

export const _getDaNhan = async (data) => {
    const response = await giaonhan.post('/api/Api_GiaoHang/TongSoDonHangDangGiaoCuaToi',data);
    return response.data
}

export const _getListCanNhan = async (data) => {  
    const response = await giaonhan.post('/api/Api_GiaoHang/DonHangCuaToi', data);
    return response.data;
};

export const _getListDaNhan = async (data) => {    
    const response = await giaonhan.post('/api/Api_GiaoHang/DonHangDangGiaoCuaToi',data);
    return response.data;
};

export const _xacNhanGiaoHang = async (loaiGiaoHang,listSelect) => {
    if(loaiGiaoHang === 'GIAO_HANG'){
        const response = await giaonhan.post('/api/Api_GiaoHang/XacNhanDonHangDiGiao',listSelect);
        return response.data;
    }else{
        const response = await giaonhan.post('/api/Api_GiaoHang/XacNhanDonHangDiLayHang',listSelect);
        return response.data;
    }    
}

export const _noteNoiDung = async (data) => {
    const response = await giaonhan.post('/api/Api_GiaoHang/NoteDonHang',data);
    return response.data;
}

export const _updateGiaoHang = async (data) => {
    const response = await giaonhan.post('/api/Api_GiaoHang/UpdateTrangThaiDon',data);
    return response.data;
}

export const _huyDonHang = async (data) => {
    const data1 = {
        ChiTiet: data   
    }
    const response = await giaonhan.post('/api/Api_GiaoHang/HuyTrangThaiDon', data1);
    return response.data;
}