import React from 'react';

const Footer = () => {
    const fakeData = [
        {
            heading: "Hỗ trợ",
            content: [
                {
                    title: "Trung tâm trợ giúp",
                    link: "https://www.airbnb.com.vn/help/home?from=footer",
                },
                {
                    title: "Thông tin an toàn",
                    link: "https://www.airbnb.com.vn/trust",
                },
                {
                    title: "Các tuỳ chọn huỷ",
                    link: "airbnb.com.vn/help/article/2701/chính-sách-trường-hợp-bất-khả-kháng-và-đại-dịch-virút-corona-covid19",
                },
                {
                    title: "Biện pháp ứng phó với dịch covid của chúng tôi",
                    link: "https://www.airbnb.com.vn/d/covidsafety",
                },
                {
                    title: "Hỗ trợ người khuyết tật",
                    link: "https://www.airbnb.com.vn/accessibility",
                },
                {
                    title: "Báo cáo lo ngại của hàng xóm",
                    link: "https://www.airbnb.com.vn/neighbors",
                },
            ]
        },
        {
            heading: "Cộng đồng",
            content: [
                {
                    title: "Airbnb.org: ở nhà cứu trợ",
                    link: "https://vi.airbnb.org/?_ga=2.169185058.2046143775.1641715460-661691651.1641715460&_set_bev_on_new_domain=1641715489_ZmM3NmYyMGY3YmIy",
                },
                {
                    title: "Hỗ trợ dân tị nạn Afghanistan",
                    link: "https://www.airbnb.org/refugees?_ga=2.182413348.2046143775.1641715460-661691651.1641715460",
                },
                {
                    title: "Vì sự đa dạng thân thuộc",
                    link: "https://www.airbnb.com.vn/diversity",
                },
                {
                    title: "Chống phân biệt đối xử",
                    link: "https://www.airbnb.com.vn/against-discrimination",
                },
            ]
        },
        {
            heading: "Đón tiêp khách hàng",
            content: [
                {
                    title: "Thử đón tiêp khách hàng",
                    link: "https://www.airbnb.com.vn/host/homes?from_footer=1",
                },
                {
                    title: "AirCover: Bảo vệ cho host",
                    link: "https://www.airbnb.com.vn/aircover",
                },
                {
                    title: "Xem tài nguyên đón tiếp khách",
                    link: "https://www.airbnb.com.vn/resources/hosting-homes",
                },
                {
                    title: "Trung cập diễn đàn cộng đồng",
                    link: "https://community.withairbnb.com/t5/errors/FilterErrorHandlerPage",
                },
                {
                    title: "Đón tiếp khách hàng có trách nhiệm",
                    link: "https://www.airbnb.com.vn/help/article/1397/th%C3%B4ng-tin-chung-v%E1%BB%81-cho-thu%C3%AA-ch%E1%BB%97-%E1%BB%9F",
                },
            ]
        },
        {
            heading: "Giới thiệu",
            content: [
                {
                    title: "Trang tin tức",
                    link: "https://news.airbnb.com/",
                },
                {
                    title: "Tìm hiểu các tính năng mới",
                    link: "https://www.airbnb.com.vn/2021-winter",
                },
                {
                    title: "Trung tâm trợ giúp",
                    link: "",
                },
                {
                    title: "Thư ngỏ lời từ các nhà sáng lập",
                    link: "https://news.airbnb.com/what-makes-airbnb-airbnb/",
                },
                {
                    title: "Cơ hội nghề nghiệp",
                    link: "https://careers.airbnb.com/",
                },
                {
                    title: "Nhà đầu tư",
                    link: "https://investors.airbnb.com/home/default.aspx",
                },
                {
                    title: "Airbnb luxe",
                    link: "https://www.airbnb.com.vn/luxury",
                },
            ]
        },
    ];
    return (
        <div className='xl:mt-10 md:mt-5'>
            <div className='px-20 py-10 bg-gray-100'>
                <div className='grid xl:grid-cols-4 md:grid-cols-2 sm:grid-cols-1 gap-x-6 gap-y-10'>

                    {fakeData.map((item1, i) => {
                        return (
                            <div key={i}>
                                <h1 className='text-sm font-semibold'>{item1.heading}</h1>
                                {item1.content.map((item2, i) => {
                                    return (
                                        <a
                                            key={i}
                                            href={item2.link}
                                            className='text-sm mt-4 block hover:underline-offset-1 hover:underline'
                                        >
                                            {item2.title}
                                        </a>
                                    )
                                })}
                            </div>
                        )
                    })}
                </div>
            </div>
        </div>

    )
}

export default Footer
