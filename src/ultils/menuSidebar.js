import icons from "./icons"

const {FaPencilAlt,MdLibraryBooks,FaUserEdit,MdContactPage} = icons

const menuSideBar  = [
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
        text: 'Sửa thông tin cá nhân',
        path: '/he-thong/sua-thong-tin-ca-nhan',
        icon: <FaUserEdit/>
    },
    {
        id: 4,
        text: 'Liên hệ',
        path: '/lien-he',
        icon: <MdContactPage/>
    },
]

export default menuSideBar