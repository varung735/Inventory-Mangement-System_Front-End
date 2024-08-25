import React, { useEffect, useState } from 'react'
import Table from '../../props/Table'
import { getRequest, patchRequest, postRequest } from '../../API/api';
import { routes_v_1 } from '../../API/routes';
import SnackBar from '../../components/SnackBar';
import Modal from '../../modals/Modal';
import formCSS from '../../styles/form.module.css';

function Users() {
  const [users, setUsers] = useState([]);
  const [success, setSuccess] = useState(false);
  const [message, setMessage] = useState("");
  const [viewSnackBar, setViewSnackBar] = useState(false);
  const [trigger, setTrigger] = useState(0);
  const [modal, setModal] = useState(false);
  const [modalProp, setModalProp] = useState("");
  const headings = ['Name', 'Username', 'Email', 'Role', 'Access', 'Details', 'Revoke', 'Grant'];

  useEffect(() => {
    getUsers();
    // eslint-disable-next-line
  }, [trigger]);

  function closeModal() {
    setModal(!modal);
  }

  function snackBar() {
      setViewSnackBar(true);
      setTimeout(() => {
        setViewSnackBar(false);
      }, 8000);
  }

  async function getUsers() {
    const response = await getRequest(routes_v_1.user.getUsers);
    setSuccess(response.success);
    setMessage(response.message);
    setUsers(response.users);
    snackBar();
  }

  async function addUser(user) {
    const response = await postRequest(routes_v_1.user.addUsers, user);
    setSuccess(response.success);
    setMessage(response.message);
    setUsers(response.users);
    setTrigger(trigger + 1);
    snackBar();
  }

  async function userDetails() {
    setModalProp("User Details");
    setModal(!modal);
  }

  async function grantAccess(id) {
    const response = await patchRequest(routes_v_1.user.grantAccess, {
      userId: id
    });

    setSuccess(response.success);
    setMessage(response.message);
    setTrigger(trigger + 1);
    snackBar();
  }
  
  async function revokeAccess(id) {
    const response = await patchRequest(routes_v_1.user.revokeAccess, {
      userId: id
    });
    
    setSuccess(response.success);
    setMessage(response.message);
    setTrigger(trigger + 1);
    snackBar();
  }

  return (
    <div className={formCSS.formDiv} style={{marginTop: 0, gap: 15 + 'px', padding: 0.5 + '%'}}>
      { modal && <Modal prop={modalProp} operation={addUser} closeModal={closeModal}/> }
      { viewSnackBar && <SnackBar success={success} message={message} viewSnackBar={viewSnackBar} setViewSnackbar={setViewSnackBar} /> }
      <div>
        <button className={formCSS.formButton} style={{marginTop: 0.5 + '%'}} onClick={() => {setModalProp("User"); setModal(!modal)}}>Add User</button>
      </div>
      <div>
        <Table
          tableheadings={headings}
          props={users}
          operations={['Details', 'Grant', 'Revoke']}
          operationFunctions={[userDetails, grantAccess, revokeAccess]}
        />
      </div>
    </div>
  )
}

export default Users