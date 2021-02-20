import axios from 'axios';
const originErp = 'http://sales.hoplong.com/';

// Lay toan bo don tam ung
export const callApiTamUng = async(body) => {
    return new Promise((resolve, reject) => {
        axios.post(`${originErp}api/Api_DeNghiTamUng/GetDeNghiTUNV`, body)
        .then(res => resolve(res.data))
        .catch(err => reject(err))
    })
};

// Dem don tam ung
export const callApiDemDonTamUng = async(body) => {
    return new Promise((resolve, reject) => {
        axios.post(`${originErp}api/Api_DeNghiTamUng/DemListDeNghiTUNV`, body)
        .then(res => resolve(res.data))
        .catch(err => reject(err))
    })
};

// Tao tam ung
export const callApiTaoTamUng = async(nguoiDeNghi, lyDoDN, soTienDN, SoTienChu, maCongTy) => {
    return new Promise((resolve, reject) => {
        axios.post(`${originErp}api/Api_DeNghiTamUng/PostDeNghiTU`, {
            NGUOI_DE_NGHI: nguoiDeNghi,
            LY_DO_DN: lyDoDN,
            SO_TIEN_DE_NGHI: soTienDN,
            SO_TIEN_BANG_CHU: SoTienChu,
            TRUC_THUOC: maCongTy
        })
        .then(res => resolve(res.data))
        .catch(err => reject(err))
    })
};

// Delete don tam ung
export const callApiDeleteTamUng = async(id) => {
    return new Promise((resolve, reject) => {
        axios.get(`${originErp}api/Api_DeNghiTamUng/DeleteDeNghiTamUng/${id}`)
        .then(res => resolve(res.data))
        .catch(err => reject(err))
    })
};