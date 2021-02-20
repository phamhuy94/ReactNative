import giaonhan from '../baseUrl2';
import moment from 'moment';

// Lay list quan ly quang duong
export const _getQuangDuong = async (macongty, username, maphongban, isadmin, ngay, tukhoa1, tukhoa2) => {
    const dateCvt = moment(ngay).format('DD-MM-YYYY');
    const response = await giaonhan.post('/api/Api_GiaoHang/ListQuanLyQuangDuong', {
        macongty: macongty,
        username: username,
        maphongban: maphongban,
        isadmin: isadmin,
        ngay: dateCvt,
        tukhoa1: tukhoa1,
        tukhoa2: tukhoa2,
    })
    return response.data;
};

// Them km dau
export const _postKmDau = async (username, soDau) => {
    const response = await giaonhan.post('/api/Api_GiaoHang/AddnewKmDau', {
        NHAN_VIEN: username,
        SO_DAU: soDau
    })
};

// Them km cuoi
export const _postKmCuoi = async (id, username, soCuoi) => {
    const response = await giaonhan.post('/api/Api_GiaoHang/UpdateKmDau', {
        ID: id,
        NHAN_VIEN: username,
        SO_CUOI: soCuoi
    })
};

// Update km danh cho Admin
// export const _updateSoKm = async () => {
//     const response = await giaonhan.post('/api/Api_GiaoHang/SuaSoKm', {
//         ID: id,
//         NHAN_VIEN: username,
//         SO_DAU: soDau,
//         SO_CUOI: soCuoi
//     })
// }