const attendanceResolver = {
    Mutation:{
        postAttendance: async(_,{input},context) => {
            const {present , zone , center} = input;
            const user = context.getUser();
            console.log(user);
            console.log("Zone : "+zone + "center : "+center);
        }
    },
    Query:{

    }
}

export default attendanceResolver;