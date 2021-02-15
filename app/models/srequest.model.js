const sql = require("./db.js");

const SRequest = function(request){
    this.userid = request.userid;
    this.category = request.category;
    this.location = request.location;
    this.requestdate = request.requestdate;
    this.status = request.status;
    this.preferedtimeslot = request.preferedtimeslot;
    this.emergency = request.emergency;
    this.serviceprovider = request.serviceprovider;
    this.createdby = request.createdby;
    this.description = request.description;
}

SRequest.create = (newRequest, result) => {
    sql.query("insert into servicerequest set ?", newRequest, (err, res) => {
        if (err) {
            console.log(err);
            result(err,null);
            return;
        }
        console.log("Create Request: ", {id: res.insertId, ...newRequest});
        result(null, {id: res.insertId, ...newRequest});
    });
};

SRequest.findbyStatus = (status, result) => {
    sql.query(`select * from servicerequest where status = '${status}'`, (err,res) => {
        if (err) {
            result(err,null);
            return;
        }
        if (res.length){
            result(null,res);
            return;
        }
        result({kind: "not_found"},null);
    });
};

SRequest.findbyProvider = (Providerid, result) => {
    sql.query(`select * from servicerequest where serviceprovider = ${Providerid}`, (err,res) => {
        if (err) {
            result(err,null);
            return;
        }
        if (res.length){
            result(null,res);
            return;
        }
        result({kind: "not_found"},null);
    });
};

SRequest.findbyService = (serviceid, result) => {
    sql.query(`select * from servicerequest where serviceid = ${serviceid}`, (err,res) => {
        if (err) {
            result(err,null);
            return;
        }
        if (res.length){
            result(null,res);
            return;
        }
        result({kind: "not_found"},null);
    });
};

SRequest.findbyUserid = (userid, result) => {
    sql.query(`select id, category,location, date_format(requestdate,'%y-%m-%d') requestdate, status, preferedtimeslot,emergency from servicerequest where userid = ${userid}`, (err,res) => {
        if (err) {
            result(err,null);
            return;
        }
        if (res.length){
            console.log(res);
            result(null,res);
            return;
        }
        result({kind: "not_found"},null);
    });
};

SRequest.bookinglist = (providerid, result) => {
    sql.query(`call bookinglist(${providerid})`, (err,res) => {
        if (err) {
            result(err,null);
            console.log(err);
            return;
        }
        if (res.length){
            console.log(res);
            result(null,res);
            return;
        }
        result({kind: "not_found"},null);
    });
};

SRequest.Update = (id, request, result) => {
    let sts = request.status.split(':');
    console.log(`update servicerequest set serviceprovider = ${request.serviceprovider} and status = '${sts[0]}' where id = ${id}`);
    sql.query(`update servicerequest set serviceprovider = ${request.serviceprovider}, status = '${sts[0]}' where id = ${id}`, (err, res) => {
        if (err) {
            result(err,null);
            return;
        }
        result(null,res);
    });

    let values = 
        {
        requestid: id,
        status: sts[0],
        statusdescription: sts[1]
        };
        console.log(values);
    sql.query("insert into servicestatus set ?", values, (err,data) => {
        if (err){
            console.log(err);
        }
    });

};

module.exports = SRequest;