import axiosInstance from '../baseUrl';
import moment from 'moment';

// Lay toan bo don xac nhan
export const _getDonXacNhanNV = async(trucThuoc,username,isadmin,maphongban,chucvu,tukhoa,sotrang,sobanghi) => {
    const response = await axiosInstance.post('/api/Api_DonXacNhan/GetDonXacNhanNV', {
        macongty: trucThuoc,
        username: username,
        isadmin: isadmin,
        maphongban: maphongban,
        chucvu: chucvu,
        tukhoa: tukhoa,
        sotrang: sotrang,
        sobanghi: sobanghi,
    })
    return response.data;
}

//Tao don xac nhan
export const _postDonXacNhanNV = async(nguoiDeNghi,noiDungCanXacNhan,ngayCanXacNhan,trucThuoc) => {
    const dateTimeXN = moment(ngayCanXacNhan).format('DD/MM/YYYY')
    const dataXN = {
        NGUOI_DE_NGHI:nguoiDeNghi,
        NOI_DUNG_CAN_XAC_NHAN:noiDungCanXacNhan,
        NGAY_CAN_XAC_NHAN:dateTimeXN,
        TRUC_THUOC:trucThuoc,
    }
    const response = await axiosInstance.post('/api/Api_DonXacNhan/PostDonXacNhan', dataXN)
    return response.data
}

//Dem don xac nhan NV
export const _demDonXacNhanNV = async (trucThuoc,username,isadmin,maphongban,chucvu,tukhoa,sotrang,sobanghi) => {
    const response = await axiosInstance.post('/api/Api_DonXacNhan/DemDonXacNhanNV', {
        macongty: trucThuoc,
        username: username,
        isadmin: isadmin,
        maphongban: maphongban,
        chucvu: chucvu,
        tukhoa: tukhoa,
        sotrang: sotrang,
        sobanghi: sobanghi,
    });
    return response.data
}

//Trang thai don xac nhan NV
export const _getTruongPhongDuyetDonXN = async(truongphongduyet,truongphongdaduyet,truongphonghuyduyet,lydohuy) => {
 const response = await axiosInstance.post('/api/Api_DonXacNhan/TruongPhongDuyetDonXN', {
    TRUONG_PHONG_DUYET:truongphongduyet,
    TRUONG_PHONG_DA_DUYET:truongphongdaduyet,
    TRUONG_PHONG_HUY_DUYET: truongphonghuyduyet,
    LY_DO_HUY:lydohuy,
 })
 return  response.data;
}

// Cap nhat don Xac nhan NV
export const _capNhatDonXacNhan = async () => {
    const response = await axiosInstance.post('/api/Api_DonXacNhan/CapNhatDonXacNhan', {
        NOI_DUNG_CAN_XAC_NHAN:noidungcanxacnhan,
        NGAY_CAN_XAC_NHAN:ngaycanxacnhan
    })
    return response.data
}

//Huy don xac nhan NV
export const _deleteDonXacNhan = async (id) => {
    const response = await axiosInstance.post('/api/Api_DonXacNhan/DeleteDonXacNhan/' + id);
    return response.data
}
