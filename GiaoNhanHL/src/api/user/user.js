import axiosInstance from '../baseUrl';

export const _getUser = async (data) => {    
    const response = await axiosInstance.post('/api/Api_NhanVien/NhanVienPhongBan',data);
    return response.data;
};

export const _getUserDetail = async (username) => {
    const response = await axiosInstance.get('/api/Api_NhanVien/GetChiTietNhanVien/' + username);
    return response.data
}