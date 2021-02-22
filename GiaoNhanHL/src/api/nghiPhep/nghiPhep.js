import axiosInstance from '../baseUrl';
import moment from 'moment';
// Lay toan bo don xin nghi phep
export const _getDonXinNghiNV = async(trucThuoc, username, isadmin, tukhoa, tukhoa1, tukhoa2, sotrang, sobanghi) => {
    const response = await axiosInstance.post('/api/Api_DonXinNghiPhep/GetDonXinNghiNV', {
        macongty: trucThuoc,
        username: username,
        isadmin: isadmin,
        tukhoa: tukhoa,
        tukhoa1: tukhoa1,
        tukhoa2: tukhoa2,
        sotrang: sotrang,
        sobanghi: sobanghi,
    })
    return  response.data;
}

//Dem so luong don xin nghi phep NV
export const _demDonXinNghiPhepNV = async(trucThuoc, username, isadmin, tukhoa, tukhoa1, tukhoa2) => {
    const response = await axiosInstance.post('/api/Api_DonXinNghiPhep/DemDonXinNghiPhepNV', {
        macongty:trucThuoc,
        username:username,
        isadmin:isadmin,
        tukhoa:tukhoa,
        tukhoa1: tukhoa1,
        tukhoa2: tukhoa2
    })
    return response.data
}

//Lay tong so ngay nghi nhan vien
export const _getTongSoNgayNghiNV = async(trucThuoc,isadmin,username,maphongban,thang,nam,tukhoa) => {
 const response = await axiosInstance.post('/api/Api_DonXinNghiPhep/GetTongSoNgayNghiNV', {
    macongty:trucThuoc,
    isadmin:isadmin,
    username: username,
    maphongban:maphongban,
    thang:thang,
    nam:nam,
    tukhoa:tukhoa,
 })
 return  response.data;
}

// Tao don xin nghi phep
export const _postDonXinNghiNV = async (username, lyDoNghi, loaiNghiPhep, dateTime, tongSoNgay, trucThuoc, dateTimeRow, day) => {
    const dateTimeCvt = moment(dateTimeRow).format('DD/MM/YYYY')
    const data = {
        NGUOI_DE_NGHI: username,
        LY_DO_XIN_NGHI: lyDoNghi,
        LOAI_NGHI_PHEP: loaiNghiPhep,
        THOI_GIAN_NGHI: "",
        TONG_SO_NGAY_NGHI: tongSoNgay,
        TRUC_THUOC: trucThuoc,
        List_row: [
            {
                NGAY_NGHI: dateTimeCvt,
                TYPE: day
            }
        ]
    }
    const response = await axiosInstance.post('/api/Api_DonXinNghiPhep/PostDonXinNghiPhep_01', data);
    return response.data
}


//Don xin nghi phep da duyet
export const _donXinNghiPhepDaDuyet = async (trucThuoc,username,isadmin,maphongban,tukhoa1,tukhoa2,tukhoa3,sotrang,sobanghi) => {
    const response = await axiosInstance.post('/api/Api_DonXinNghiPhep/DonXinNghiPhepDaDuyet', {
        macongty:trucThuoc,
        username:username,
        isadmin:isadmin,
        maphongban:maphongban,
        tukhoa1:tukhoa1,
        tukhoa2:tukhoa2,
        tukhoa3:tukhoa3,
        sotrang:sotrang,
        sobanghi:sobanghi
    });
    return response.data
}

//Dem don xin nghi phep da duyet
export const _demDonXinNghiPhepDaDuyet = async (trucThuoc,username,isadmin,maphongban,tukhoa1,tukhoa2,tukhoa3,sotrang,sobanghi) => {
    const response = await axiosInstance.post('/api/Api_DonXinNghiPhep/DemDonXinNghiPhepDaDuyet', {
        macongty:trucThuoc,
        username:username,
        isadmin:isadmin,
        maphongban:maphongban,
        tukhoa1:tukhoa1,
        tukhoa2:tukhoa2,
        tukhoa3:tukhoa3,
        sotrang:sotrang,
        sobanghi:sobanghi
    });
    return response.data
}

// Xoa don xin nghi phep
export const _deleteDonNghiPhep = async (id) => {
    const response = await axiosInstance.post('/api/Api_DonXinNghiPhep/DeleteDonNghiPhep/' + id);
    return response.data
};

//Update don xin nghi phep
export const _updateDonNghiPhep = async (lydoxinnghi,thoigiannghi,tongsongaynghi,nguoidenghi,listRow) => {
    const response = await axiosInstance.post('/api/Api_DonXinNghiPhep/CapNhatDonXinNghiPhep_01', {
        LY_DO_XIN_NGHI: lydoxinnghi,
        THOI_GIAN_NGHI: thoigiannghi,
        TONG_SO_NGAY_NGHI: tongsongaynghi,
        NGUOI_DE_NGHI: nguoidenghi,
        List_row: listRow
    })
    return response.data
}
