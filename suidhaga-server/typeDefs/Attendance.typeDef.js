const AttendanceTypeDef = `#graphql

type Attendance {
    present: [ID],
    absent: [ID],
    zone: String,
    center: String,
    date: String,
    teacherName: String,
}

type manufacturer{
    _id: ID,
    userName: String,
    userType: String,
    aadharNumber: Float,
}

type Mutation{
    postAttendance(input:AttendanceInput): Attendance!
}

type Query{
    getAttendance: [Attendance]
    getAttendanceByDate(date: String): [Attendance]
    getAttendanceByCenter(center: String): [Attendence]
    getAttendanceByZone(zone: String): [Attendance]
    getAttendanceByZoneAndCenters(input:AttendanceInputZC): [Attendance]
}

input AttendanceInputZC {
    zone: String,
    centers: String
}

input AttendanceInput {
    present: [ID],
    absent: [ID],
    zone: String,
    center: String,
    date: String,
    teacherName: String,
}
`

export default AttendanceTypeDef;