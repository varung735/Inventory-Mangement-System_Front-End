import React, { useEffect, useState } from 'react'
import Table from '../../props/Table'
import { getRequest, patchRequest } from '../../API/api';
import { routes_v_1 } from '../../API/routes';
import SnackBar from '../../components/SnackBar';

function Users() {
  const [users, setUsers] = useState([]);
  const [success, setSuccess] = useState(false);
  const [message, setMessage] = useState("");
  const [viewSnackBar, setViewSnackBar] = useState(false);
  const [trigger, setTrigger] = useState(0);
  const headings = ['Name', 'Username', 'Email', 'Role', 'Access', 'Revoke', 'Grant'];

  useEffect(() => {
    getUsers();
    // eslint-disable-next-line
  }, [trigger]);

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
    <div>
      { viewSnackBar && <SnackBar success={success} message={message} viewSnackBar={viewSnackBar} setViewSnackbar={setViewSnackBar} /> }
      <Table
        tableheadings={headings}
        props={users}
        operations={['Grant', 'Revoke']}
        operationFunctions={[grantAccess, revokeAccess]}
      />
    </div>
  )
}

export default Users