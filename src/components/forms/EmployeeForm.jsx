import React, { useState } from 'react';
import formsCSS from '../../styles/form.module.css';
import Cookies from 'js-cookie';

function EmployeeForm({ employee, setEmployee, operation, updateItem }) {

  const formatDate = (date) => {
    if(date != null) {
      const formatedDate = new Date(date).toISOString().split('T')[0];
      return formatedDate;
    }
  }

  const [empName, setEmpName] = useState(updateItem.emp_name || "");
  const [designation, setDesignation] = useState(updateItem.designation || "");
  const [address, setAddress] = useState(updateItem.address || "");
  const [aadharNo, setAadharNo] = useState(updateItem.aadhar__no || "");
  const [panNo, setPanNo] = useState(updateItem.pan_no || "");
  const [acNo, setAcNo] = useState(updateItem.ac_no || "");
  const [bankName, setBankName] = useState(updateItem.bank_name || "");
  const [ifscCode, setIfscCode] = useState(updateItem.ifsc_code || "");
  const [contactNo, setContactNo] = useState(updateItem.contact_no || "");
  const [email, setEmail] = useState(updateItem.email || "");
  const [hiredOn, setHiredOn] = useState(formatDate(updateItem.hired_on) || "");
  const [empStatus, setEmpStatus] = useState(updateItem.emp_status || "");
  const [role, setRole] = useState(updateItem.role || "");
  const [password, setPassword] = useState(""); //As We are not giving admin the power to update employee's passwords

  const addEmployee = async () => {
    const res = await fetch('https://ims-backend-3u4x.onrender.com/employees/addEmployee', {
      method: 'POST',
      dataType: 'json',
      headers: {
        'Accept': 'application/json',
        'content-Type': 'application/json',
        'token': Cookies.get('token')
      },
      body: JSON.stringify({
        emp_name: empName,
        designation: designation,
        address: address,
        aadhar_no: aadharNo,
        pan_no: panNo,
        ac_no: acNo,
        bank_name: bankName,
        ifsc_code: ifscCode,
        contact_no: contactNo,
        email: email,
        hired_on: hiredOn,
        emp_status: empStatus,
        role: role,
        password: password
      }),
      credentials: 'include'
    });

    const resData = await res.json();
    // console.log(resData);

    setEmployee(employee => [...employee, resData.employee_data]);
    alert("added employee successfully.");
  }

  const updateEmployee = async (id) => {
    const res = await fetch(`https://ims-backend-3u4x.onrender.com/employees/updateEmployee/${id}` , {
      method: 'PUT',
      dataType: 'json',
      headers: {
        'Accept': 'application/json',
        'content-Type': 'application/json',
        'token': Cookies.get('token')
      },
      body: JSON.stringify({
        emp_name: empName,
        designation: designation,
        address: address,
        aadhar_no: aadharNo,
        pan_no: panNo,
        ac_no: acNo,
        bank_name: bankName,
        ifsc_code: ifscCode,
        contact_no: contactNo,
        email: email,
        hired_on: hiredOn,
        emp_status: empStatus,
        role: role
      }),
      credentials: 'include'
    });

    const resData = await res.json();
    console.log(resData);

    setEmployee(employee.filter(employee => employee._id !== id));
    setEmployee(employee => [...employee, resData.employee_data]);

    alert("updated employee successfully.");
  }

  const handleSubmit = (e) => {
    e.preventDefault();

    if(operation === "updateEmployee"){
      updateEmployee(updateItem._id);
    }
    else{
      addEmployee();
      setEmpName("");
      setDesignation("");
      setAddress("");
      setAadharNo("");
      setPanNo("");
      setAcNo("");
      setBankName("");
      setIfscCode("");
      setContactNo("");
      setEmail("");
      setHiredOn("");
      setEmpStatus("");
      setRole("");
      setPassword("");
    }
  }

  return (
    <div className={formsCSS.container}>
      <form action="submit" method="post" onSubmit={handleSubmit}>

        <div className={formsCSS.formDiv}>
          <label>Employee Name</label>
          <input type="text" placeholder='Enter the Employee Name' className={formsCSS.input}
           value={empName} onChange={(e) => setEmpName(e.target.value)}/>
        </div>

        <div className={formsCSS.formDiv}>
          <label>Designation</label>
          <input type="text" placeholder='Enter the Designation' className={formsCSS.input}
           value={designation} onChange={(e) => setDesignation(e.target.value)}/>
        </div>

        <div className={formsCSS.formDiv}>
          <label>Address</label>
          <input type="text" placeholder='Enter the Address' className={formsCSS.input} 
           value={address} onChange={(e) => setAddress(e.target.value)}/>
        </div>

        <div className={formsCSS.formDiv}>
          <label>Aadhar No</label>
          <input type="number" placeholder='Enter the Aadhar No' className={formsCSS.input}
           value={aadharNo} onChange={(e) => setAadharNo(e.target.value)}/>
        </div>

        <div className={formsCSS.formDiv}>
          <label>PAN No.</label>
          <input type="text" placeholder='Enter the PAN No.' className={formsCSS.input}
           value={panNo} onChange={(e) => setPanNo(e.target.value)}/>
        </div>

        <div className={formsCSS.formDiv}>
          <label>A/C No.</label>
          <input type="number" placeholder='Enter the A/C no.' className={formsCSS.input}
           value={acNo} onChange={(e) => setAcNo(e.target.value)}/>
        </div>

        <div className={formsCSS.formDiv}>
          <label>Bank Name</label>
          <input type="text" placeholder='Enter the Bank Name' className={formsCSS.input}
           value={bankName} onChange={(e) => setBankName(e.target.value)}/>
        </div>
        
        <div className={formsCSS.formDiv}>
          <label>IFSC Code</label>
          <input type="text" placeholder='Enter the IFSC Code' className={formsCSS.input}
           value={ifscCode} onChange={(e) => setIfscCode(e.target.value)}/>
        </div>

        <div className={formsCSS.formDiv}>
          <label>Contact No.</label>
          <input type="text" placeholder='Enter the Contact No.' className={formsCSS.input}
           value={contactNo} onChange={(e) => setContactNo(e.target.value)}/>
        </div>

        <div className={formsCSS.formDiv}>
          <label>Email</label>
          <input type="email" placeholder='Enter the Email' className={formsCSS.input}
           value={email} onChange={(e) => setEmail(e.target.value)}/>
        </div>

        <div className={formsCSS.formDiv}>
          <label>Hired On</label>
          <input type="date" placeholder='Enter the employee joining date' className={formsCSS.input}
           value={hiredOn} onChange={(e) => setHiredOn(e.target.value)}/>
        </div>

        <div className={formsCSS.formDiv}>
          <label>Employee Status</label>
          <input type="text" placeholder='Enter the employee status' className={formsCSS.input}
           value={empStatus} onChange={(e) => setEmpStatus(e.target.value)}/>
        </div>

        <div className={formsCSS.formDiv}>
          <label>Role</label>
          <input type="text" placeholder='Enter the Role' className={formsCSS.input}
           value={role} onChange={(e) => setRole(e.target.value)}/>
        </div>

        { operation === "addEmployee" && <div className={formsCSS.formDiv}>
          <label>Password</label>
          <input type="text" placeholder='Enter the Password' className={formsCSS.input}
           value={password} onChange={(e) => setPassword(e.target.value)}/>
        </div> }

        <button className={formsCSS.formButton}>SUBMIT</button>

      </form>
    </div>
  )
}

export default EmployeeForm