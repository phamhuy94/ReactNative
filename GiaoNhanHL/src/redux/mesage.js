import { showMessage } from "react-native-flash-message";

const message = (message, code) => {
    if(code === 200) {
        return(
            showMessage({
                message: message,
                type: 'success',
                backgroundColor: '#048AD1',
                color: '#f7f7f7',
                duration: 3000
            })
        )
    } else {
        return (
            showMessage({
                message: message,
                type: 'warning',
                backgroundColor: '#f0ad4e',
                color: '#f7f7f7',
                duration: 3000
            })
        )
    }
};

export default message;