import icons from "./icons"

const {FaPencilAlt,MdLibraryBooks,FaUserEdit} = icons

const menuManage  = [
    {
        id: 1,
        text: 'Đăng tin cho thuê',
        path: '/he-thong/tao-moi-bai-dang',
        icon: <FaPencilAlt/>
    },
    {
        id: 2,
        text: 'Quản lí tin đăng',
        path: '/he-thong/quan-li-bai-dang',
        icon: <MdLibraryBooks/>
    },
    {
        id: 3,
        text: 'Thông tin tài khoản',
        path: '/he-thong/sua-thong-tin-ca-nhan',
        icon: <FaUserEdit/>
    },
]

export default menuManage