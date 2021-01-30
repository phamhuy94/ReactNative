 const initialState = {
    slCanNhan: 0,
    slDaNhan: 0,
    listCanNhan: [],
    listDaNhan: [],
    listSelect: [],
    loaiGiaoHang: "",
    listSelectDaNhan: []
}
const giaoNhan = (state = initialState, action) => {
    switch (action.type) {
        case 'GET_CAN_NHAN_SUCCESS':
            return {
                ...state,
                slCanNhan: action.data,
            };
        case 'GET_DA_NHAN_SUCCESS':
            return {
                ...state,
                slDaNhan: action.data,
            };
        case 'GET_LIST_CAN_NHAN_SUCCESS':
            return {
                ...state,
                listCanNhan: action.data,
                loaiGiaoHang: "",
                listSelect: []
            };
        case 'GET_LIST_DA_NHAN_SUCCESS':
            return {
                ...state,
                listDaNhan: action.data,
                listSelectDaNhan: []
            };
        case 'SELECT_CAN_NHAN':
            // console.log(state.listCanNhan)
            return {
                ...state,
                loaiGiaoHang: action.loaiGiaoHang,
                listCanNhan: state.listCanNhan.map((todo) =>
                    todo.MA_VACH === action.MA_VACH ? {...todo, isSelected: !todo.isSelected} : todo,
                ),
                listSelect: action.isSelected === true ?
                state.listSelect.filter((item) => item.MA_VACH !== action.MA_VACH) :
                [
                    ...state.listSelect,
                    {
                        MA_VACH: action.MA_VACH,
                        LOAI: action.loaiGiaoHang
                    }
                ]
            }
        case 'SELECT_DA_NHAN':
            return {
                ...state,
                listDaNhan: state.listDaNhan.map((todo) =>
                    todo.SO_CHUNG_TU === action.state.SO_CHUNG_TU ? {...todo, isSelected: !todo.isSelected} : todo,
                ),
                listSelectDaNhan: action.state.isSelected === true ?
                state.listSelectDaNhan.filter((item) => item.SO_CHUNG_TU !== action.state.SO_CHUNG_TU) :
                [
                    ...state.listSelectDaNhan,
                    {
                        SO_CHUNG_TU: action.state.SO_CHUNG_TU,
                        KHACH_HANG: action.state.KHACH_HANG,
                        LOAI: action.state.LOAI,
                        TEN_CONG_TY: action.state.TEN_CONG_TY
                    }
                ]
            }
        default:
            return state;
    }
};

export default giaoNhan;