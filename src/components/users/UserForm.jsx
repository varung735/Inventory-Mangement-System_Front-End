import React, { useState } from 'react';
import formsCSS from '../../styles/form.module.css';

function UserForm({ addUser }) {
    const [name, setName] = useState("");
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [role, setRole] = useState("");
    const [password, setPassword] = useState("");

    function handleSubmit(e) {
        e.preventDefault();

        addUser({
            name,
            username,
            email,
            role,
            password
        });

        setName("");
        setUsername("");
        setEmail("");
        setRole("");
        setPassword("");
    }

    return (
        <div className={formsCSS.container}>
            <form action="submit" method="post" onSubmit={handleSubmit}>

                <div className={formsCSS.formDiv}>
                    <label>Name</label>
                    <input type="text" placeholder='Enter the Name' className={formsCSS.input}
                        value={name} onChange={(e) => setName(e.target.value)} />
                </div>

                <div className={formsCSS.formDiv}>
                    <label>Username</label>
                    <input type="text" placeholder='Enter the Username' className={formsCSS.input}
                        value={username} onChange={(e) => setUsername(e.target.value)} />
                </div>

                <div className={formsCSS.formDiv}>
                    <label>Email</label>
                    <input type="text" placeholder='Enter the Email' className={formsCSS.input}
                        value={email} onChange={(e) => setEmail(e.target.value)} />
                </div>

                <div className={formsCSS.formDiv}>
                    <label>Role</label>
                    <input type="text" placeholder='Enter the Role' className={formsCSS.input}
                        value={role} onChange={(e) => setRole(e.target.value)} />
                </div>

                <div className={formsCSS.formDiv}>
                    <label>Password</label>
                    <input type="password" placeholder='Enter the Password' className={formsCSS.input}
                        value={password} onChange={(e) => setPassword(e.target.value)} />
                </div>

                <button className={formsCSS.formButton}>SUBMIT</button>

            </form>
        </div>
    )
}

export default UserForm