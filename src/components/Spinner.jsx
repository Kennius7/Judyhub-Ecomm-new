/* eslint-disable react/prop-types */




const Spinner = ({ 
    dim1="80px", dim2="70px", dim3="60px", 
    borWidth="4px", borColor1="#613207", 
    borColor2="#613207", borColor3="#613207" 
}) => {

    return (
        <div className="flexCenter">
            <div 
                style={{ width: dim1, height: dim1, borderWidth: borWidth, borderColor: borColor1 }} 
                className="!border-t-transparent rounded-full animate-spin flexCenter">
                <div 
                    style={{ width: dim2, height: dim2, borderWidth: borWidth, borderColor: borColor2 }} 
                    className="!border-t-transparent rounded-full animate-spin flexCenter">
                    <div 
                        style={{ width: dim3, height: dim3, borderWidth: borWidth, borderColor: borColor3 }} 
                        className="!border-t-transparent rounded-full animate-spin flexCenter">
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Spinner