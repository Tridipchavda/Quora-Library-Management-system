const express = require('express');
const cors = require('cors');
const bp = require('body-parser');
const app = express();

const mysql = require('mysql');
const bodyParser = require('body-parser');

const db = mysql.createPool({
    host: "localhost",
    user: "root",
    password: "",
    database: "librarysystem"
})

app.use(cors());
app.use(express.json());
app.use(bp.urlencoded({extended:true}));


app.post("/getData",(req,res)=>{
    const selectQuery = "SELECT * FROM `readerdata`"

    const id = req.body.id;
    const password = req.body.password;

    var flag = "";
    db.query(selectQuery,(err,result)=>{
        

        for(var i=0;i<result.length;i++){
            
            if(result[i].r_id == id && result[i].password == password){
                console.log(result[i].r_id);
                

                flag = result[i];
                
                break;
                
            }
        }
        console.log(flag);
        res.send(flag);
    })
})

app.post("/getLibrarianDetails",(req,res)=>{
    
    const getDetailQuery = `SELECT * FROM librarian_details WHERE L_id='${req.body.id}'`;
    console.log(getDetailQuery);

    db.query(getDetailQuery,(err,result)=>{
        console.log(result);
        console.log(err);

     
        res.send(JSON.stringify(result));   
        

    })
})

app.post("/LibrarianLogin",(req,res)=>{
    if(req.body.id==null || req.body.password==null){
        res.send("No Credentials Accepted");
        return;
    }
    const loginQuery = `SELECT * FROM librarian_details WHERE L_id='${req.body.id}' AND L_pass='${req.body.password}'`;

    db.query(loginQuery,(err,result)=>{
        console.log(result.length);
        console.log(err);

        if(result.length != 0){
            res.send("Successful Login");
           
        }
        else{
            res.send("Login Failed");
        }

    })
    
});

app.post("/getBooksDataForReader",(req,res)=>{
    const selectQueryForBook = "SELECT * FROM `librarybookstock`"
 
    db.query(selectQueryForBook,(err,result)=>{
        res.send(JSON.stringify(result));
    })

})

app.post("/getBookApproval",(req,res)=>{
    const selectQueryForBook = "SELECT * FROM `librarybookstock`"
 
    db.query(selectQueryForBook,(err,result)=>{
        res.send(JSON.stringify(result));
    })

})

app.post("/sendBookApproval",(req,res)=>{
    const selectQueryForBook = "INSERT INTO `approvalstatus`(`book_id`, `book_name`, `reader_id`, `reader_name`, `status`, `book_price`) VALUES (?,?,?,?,?,?)";

    const bId = req.body.bId;
    const name = req.body.name;
    const price = req.body.price;
    const rId = req.body.rId;
    const rName = req.body.rName;

    const selectQueryForOneUser = `SELECT * FROM readerdata WHERE r_id=${rId}`;

    db.query(selectQueryForOneUser,(err,result)=>{
        if(err!=null){
            res.send("Error");
            return;
        }
        if(result[0].balance >= price){

            db.query(selectQueryForBook,[bId,name,rId,rName,0,price],(err,result)=>{
                console.log(err);
                res.send("Success");
            })
        }
        else{
            res.send("No Balance");
        }
    })

    

})
app.post("/confirmBookIssue",(req,res)=>{
    const checkBookAvailsQuery = `SELECT * FROM librarybookstock WHERE book_id=${req.body.bId}`;

    db.query(checkBookAvailsQuery,(err,result)=>{
    
        console.log(result[0].book_avails);
        if(result[0].book_avails != 0){
            const checkReaderBalance = `SELECT * FROM readerdata WHERE r_id=${req.body.rId}`;

            db.query(checkReaderBalance,(err,result)=>{
                console.log(result[0].balance);

                if(result[0].balance > req.body.amount){
                    const updateApprovalsQuery = `UPDATE approvalstatus SET status=1 WHERE book_id=${req.body.bId} AND reader_id=${req.body.rId}`;

                    const updatedBalance = result[0].balance - req.body.amount;
                    const deduceBalanceQuery = `UPDATE readerdata SET balance=${updatedBalance} WHERE r_id=${req.body.rId}`;
                    
                    db.query(updateApprovalsQuery,(err,result)=>{
                        if(err==null){
                            db.query(deduceBalanceQuery,(err,result)=>{
                                console.log(result);
                                console.log(err);
                            })
                        }
                    })
                }
                else{
                    console.log("No Balance");
                }
            })
        }
    })

});
app.post("/getApprovals",(req,res)=>{
    const approvals = "SELECT * FROM `approvalstatus`";

    db.query(approvals,(err,result)=>{
        console.log(result);

        res.send(JSON.stringify(result));
    })
})

app.post("/requestBook",(req,res)=>{
    const requestBookQuery = "INSERT INTO `requestbooklist`(`book_name`, `auth_name`, `requester_id`, `requester_name`) VALUES (?,?,?,?)";
 
    const id = req.body.id;
    const rname = req.body.rName;
    const bookName = req.body.bookName;
    const authName = req.body.authName;
    
    
    console.log(rname);
    console.log(id);
    console.log(bookName);
    console.log(authName);

    db.query(requestBookQuery,[bookName,authName,id,rname],(err,result)=>{
        if(err != null){
            res.send("Data entry failed due to Wrong Credentials or Same Request");
        }
        console.log(err);
    })

})

app.post("/getBalance",async(req,res)=>{

    const id = req.body.id;

    const selectQueryForOneUser = `SELECT * FROM readerdata WHERE r_id=${id}`;

    db.query(selectQueryForOneUser,(err,result)=>{
        res.send(result);
    })

})
app.post("/addMoneyRequest",async(req,res)=>{

    const id = req.body.id;
    const amount = req.body.amt;

    const selectQueryForOneUser = `SELECT * FROM readerdata WHERE r_id=${id}`;

    var currBalance = parseInt(amount);

    db.query(selectQueryForOneUser,(err,result)=>{
        currBalance +=  parseInt(result[0].balance);
        console.log(currBalance);

        
        const addMoneyQuery = `UPDATE readerdata SET balance = '${currBalance}' WHERE readerdata.r_id = ${id}`;
        db.query(addMoneyQuery,(err,result)=>{
            console.log(err);
            if(err==null){
                res.send("Success");
            }
            else{
                res.send("Data Updation Failed");
            }
        })
    })
    
})

app.post("/",(req,res)=>{
    const insertQuery = "INSERT INTO `readerdata`(`r_id`, `r_email`, `password`, `name`) VALUES (?,?,?,?)"
    
    const name = req.body.name;
    const r_email = req.body.email;
    const r_id = req.body.id;
    const password = req.body.password;

    console.log(name);
    console.log(r_email);
    console.log(r_id);
    console.log(password);

    db.query(insertQuery,[r_id,r_email,password,name],(err,result)=>{
        console.log(err);
    })
    // res.end("er");

})

app.listen(3001,()=>{
    console.log("Server Started for database Handler at 3001");
})
