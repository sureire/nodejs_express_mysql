const sql = require("./db.js");

const SRequest = function(request){
    this.userid = request.userid;
    this.serviceid = request.serviceid;
    this.requestdate = request.requestdate;
    this.status = request.status;
    this.preferedtimeslot = request.preferedtimeslot;
    this.emergency = request.emergency;
    this.serviceprovider = request.serviceprovider;
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
    sql.query(`select a.id, name, date_format(requestdate,'%y-%m-%d') requestdate, status, preferedtimeslot,emergency from servicerequest a, services b where a.serviceid = b.id and userid = ${userid}`, (err,res) => {
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

SRequest.bookinglist = result => {
    sql.query("select * from bookinglist", (err,res) => {
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
    console.log(`update servicerequest set serviceprovider = ${request.serviceprovider} and status = '${request.status}' where id = ${id}`);
    sql.query(`update servicerequest set serviceprovider = ${request.serviceprovider} and status = '${request.status}' where id = ${id}`, (err, res) => {
        if (err) {
            result(err,null);
            return;
        }
        result(null,res);
    });
};

module.exports = SRequest;