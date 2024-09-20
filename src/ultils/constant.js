// object lưu  tất cả đường  dẫn của trang web
export const path ={
    HOME : '/*',
    HOME__PAGE:  ':page',
    LOGIN : 'login',
    CHO_THUE_CAN_HO: 'cho-thue-can-ho',
    MAT_BANG: 'mat-bang',
    CHO_THUE_PHONG_TRO : 'cho-thue-phong-tro',
    NHA_CHO_THUE: 'nha-cho-thue',
    DETAIL_POST__TITLE__POSTID: 'chi-tiet/:title/:postId',
    SEARCH : 'tim-kiem',
    SYSTEM: '/he-thong/*',
    CREATE_POST:'tao-moi-bai-dang',
    MANAGE_POST:'quan-li-bai-dang',
    EDIT_ACCOUNT:'sua-thong-tin-ca-nhan',
    CONTACT:'lien-he',
    DETAIL:'/chi-tiet/',
    DETAIL_ALL:'chi-tiet/*',
}

export const text = {
    HOME_TITLE: 'Cho Thuê Mặt Bằng, Giá Rẻ, Chính Chủ, Mới Nhất 2024',
    HOME_DESCRIPTION: 'Cho thuê mặt bằng: giá rẻ, chính chủ, gần chợ, trường học, tiện mở quán ăn, cafe, kinh doanh mọi ngành nghề. Đăng tin cho thuê mặt bằng hiệu quả tại Phongtro247.com '
}

export const location = [
    {
        id: 'hcm',
        name: 'Mặt bằng Hồ Chí Minh',
        image: 'https://phongtro123.com/images/location_hcm.jpg',
        provinceCode: 'CUID'
    },
    {
        id: 'hn',
        name: 'Mặt bằng Hà Nội',
        image: 'https://phongtro123.com/images/location_hn.jpg',
        provinceCode: 'NDOE'

    },
    {
        id: 'dn',
        name: 'Mặt bằng Đà Nẵng',
        image: 'https://phongtro123.com/images/location_dn.jpg',
        provinceCode: 'NNAE'

    }
]
