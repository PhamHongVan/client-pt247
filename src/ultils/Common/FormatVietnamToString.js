export const formatVietnamToString = (keyword) =>{
    // this.props.saveKeyword(keyword)
    return keyword
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g,"")
    .split(" ")
    .join("-")
}