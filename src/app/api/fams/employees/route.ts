import { NextRequest, NextResponse } from "next/server"

const mockEmployees = [
  {
    id: "NV001",
    name: "Nguyễn Văn A",
    position: "Kỹ sư phần mềm",
    department: "Phát triển sản phẩm",
    email: "nguyena@company.com",
    phone: "0901234567",
    workingHours: 160,
    salary: 15000000
  },
  {
    id: "NV002", 
    name: "Trần Thị B",
    position: "Quản lý dự án",
    department: "Quản lý dự án",
    email: "tranb@company.com",
    phone: "0902345678",
    workingHours: 165,
    salary: 25000000
  },
  {
    id: "NV003",
    name: "Lê Văn C", 
    position: "Chuyên viên Marketing",
    department: "Marketing",
    email: "levanc@company.com",
    phone: "0903456789",
    workingHours: 155,
    salary: 12000000
  },
  {
    id: "NV004",
    name: "Phạm Thị D",
    position: "Kế toán trưởng", 
    department: "Kế toán tài chính",
    email: "phamthid@company.com",
    phone: "0904567890",
    workingHours: 170,
    salary: 18000000
  },
  {
    id: "NV005",
    name: "Hoàng Văn E",
    position: "Thiết kế đồ họa",
    department: "Thiết kế",
    email: "hoange@company.com", 
    phone: "0905678901",
    workingHours: 162,
    salary: 14000000
  },
  {
    id: "NV006",
    name: "Đặng Thị F",
    position: "Giám đốc nhân sự",
    department: "Nhân sự", 
    email: "dangf@company.com",
    phone: "0906789012",
    workingHours: 168,
    salary: 30000000
  },
  {
    id: "NV007",
    name: "Bùi Văn G",
    position: "Chuyên viên tư vấn",
    department: "Tư vấn giải pháp",
    email: "buig@company.com",
    phone: "0907890123", 
    workingHours: 150,
    salary: 13500000
  },
  {
    id: "NV008",
    name: "Vũ Thị H",
    position: "Chuyên viên bán hàng",
    department: "Kinh doanh",
    email: "vuh@company.com",
    phone: "0908901234",
    workingHours: 175,
    salary: 16000000
  },
  {
    id: "NV009", 
    name: "Đỗ Văn I",
    position: "Trưởng phòng IT",
    department: "Công nghệ thông tin",
    email: "doi@company.com",
    phone: "0909012345",
    workingHours: 160,
    salary: 22000000
  },
  {
    id: "NV010",
    name: "Lý Thị K",
    position: "Chuyên viên QA",
    department: "Phát triển sản phẩm", 
    email: "lyk@company.com",
    phone: "0900123456",
    workingHours: 158,
    salary: 13000000
  },
  {
    id: "NV011",
    name: "Nguyễn Thị L",
    position: "Chuyên viên nhân sự",
    department: "Nhân sự",
    email: "nguyenl@company.com",
    phone: "0901234568",
    workingHours: 165,
    salary: 14500000
  },
  {
    id: "NV012",
    name: "Trần Văn M",
    position: "Kỹ sư DevOps",
    department: "Công nghệ thông tin",
    email: "tranm@company.com",
    phone: "0902345679",
    workingHours: 170,
    salary: 20000000
  },
  {
    id: "NV013",
    name: "Lê Thị N",
    position: "Chuyên viên tài chính",
    department: "Kế toán tài chính",
    email: "len@company.com",
    phone: "0903456790",
    workingHours: 160,
    salary: 16000000
  },
  {
    id: "NV014",
    name: "Phạm Văn O",
    position: "Chuyên viên bán hàng",
    department: "Kinh doanh",
    email: "phamo@company.com",
    phone: "0904567891",
    workingHours: 175,
    salary: 15500000
  },
  {
    id: "NV015",
    name: "Hoàng Thị P",
    position: "Chuyên viên Marketing",
    department: "Marketing",
    email: "hoangp@company.com",
    phone: "0905678902",
    workingHours: 158,
    salary: 12500000
  },
  {
    id: "NV016",
    name: "Đặng Văn Q",
    position: "Kỹ sư phần mềm",
    department: "Phát triển sản phẩm",
    email: "dangq@company.com",
    phone: "0906789013",
    workingHours: 165,
    salary: 17000000
  },
  {
    id: "NV017",
    name: "Bùi Thị R",
    position: "Chuyên viên QA",
    department: "Phát triển sản phẩm",
    email: "buir@company.com",
    phone: "0907890124",
    workingHours: 162,
    salary: 14000000
  },
  {
    id: "NV018",
    name: "Vũ Văn S",
    position: "Thiết kế UI/UX",
    department: "Thiết kế",
    email: "vus@company.com",
    phone: "0908901235",
    workingHours: 160,
    salary: 15000000
  },
  {
    id: "NV019",
    name: "Đỗ Thị T",
    position: "Chuyên viên tư vấn",
    department: "Tư vấn giải pháp",
    email: "dot@company.com",
    phone: "0909012346",
    workingHours: 155,
    salary: 13000000
  },
  {
    id: "NV020",
    name: "Lý Văn U",
    position: "Quản lý dự án",
    department: "Quản lý dự án",
    email: "lyu@company.com",
    phone: "0900123457",
    workingHours: 170,
    salary: 24000000
  },
  {
    id: "NV021",
    name: "Nguyễn Thị V",
    position: "Chuyên viên nhân sự",
    department: "Nhân sự",
    email: "nguyenv@company.com",
    phone: "0901234569",
    workingHours: 168,
    salary: 14800000
  },
  {
    id: "NV022",
    name: "Trần Văn X",
    position: "Kỹ sư phần mềm",
    department: "Phát triển sản phẩm",
    email: "tranx@company.com",
    phone: "0902345680",
    workingHours: 165,
    salary: 18000000
  },
  {
    id: "NV023",
    name: "Lê Thị Y",
    position: "Chuyên viên Marketing",
    department: "Marketing",
    email: "ley@company.com",
    phone: "0903456791",
    workingHours: 160,
    salary: 12800000
  },
  {
    id: "NV024",
    name: "Phạm Văn Z",
    position: "Kế toán",
    department: "Kế toán tài chính",
    email: "phamz@company.com",
    phone: "0904567892",
    workingHours: 170,
    salary: 16500000
  },
  {
    id: "NV025",
    name: "Hoàng Thị AA",
    position: "Chuyên viên bán hàng",
    department: "Kinh doanh",
    email: "hoangaa@company.com",
    phone: "0905678903",
    workingHours: 175,
    salary: 15800000
  }
]

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const search = searchParams.get('search') || ''
    const page = parseInt(searchParams.get('page') || '1')
    const limit = parseInt(searchParams.get('limit') || '10')

    let filteredEmployees = mockEmployees

    if (search) {
      filteredEmployees = mockEmployees.filter(emp => 
        emp.name.toLowerCase().includes(search.toLowerCase()) ||
        emp.id.toLowerCase().includes(search.toLowerCase()) ||
        emp.position.toLowerCase().includes(search.toLowerCase()) ||
        emp.department.toLowerCase().includes(search.toLowerCase()) ||
        emp.email.toLowerCase().includes(search.toLowerCase())
      )
    }

    const total = filteredEmployees.length
    const startIndex = (page - 1) * limit
    const endIndex = startIndex + limit
    const employees = filteredEmployees.slice(startIndex, endIndex)

    return NextResponse.json({
      success: true,
      data: employees,
      pagination: {
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit)
      }
    })
  } catch (error) {
    console.error("FAMS employees API error:", error)
    return NextResponse.json({ 
      success: false, 
      message: "Lỗi máy chủ" 
    }, { status: 500 })
  }
}
