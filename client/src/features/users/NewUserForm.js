import { useState, useEffect } from "react"
import { useAddNewUserMutation } from "./usersApiSlice"
import { useNavigate } from "react-router-dom"
import { ROLES } from "../../config/roles"

const USER_REGEX = /^[A-z]{3,20}$/
const PWD_REGEX = /^[A-z0-9!@#$%]{4,12}$/

const NewUserForm = () => {

    const [addNewUser, {
        isLoading,
        isSuccess,
        isError,
        error
    }] = useAddNewUserMutation()

    const navigate = useNavigate()

    const [username, setUsername] = useState('')
    const [validUsername, setValidUsername] = useState(false)
    const [password, setPassword] = useState('')
    const [validPassword, setValidPassword] = useState(false)
    const [roles, setRoles] = useState(["Employee"])
    const [firstname, setFirstname] = useState('')
    const [lastname, setLastname] = useState('')
    const [fullname, setFullname] = useState('')
    const [gender, setGender] = useState('')
    const [NIC, setNic] = useState('')
    const [date_of_birth, setDob] = useState('')
    const [place_of_birth, setPob] = useState('')
    const [age, setAge] = useState('')
    const [nationality, setNationality] = useState('')
    const [religion, setReligion] = useState('')
    const [department, setDepartment] = useState('')
    const [date_joined, setDatejoin] = useState('')
    const [employee_type, setEmptype] = useState('')
    const [empID, setEmpid] = useState('')
    const [contact, setContact] = useState('')
    const [email, setEmail] = useState('')
    const [address, setAddress] = useState('')






    useEffect(() => {
        setValidUsername(USER_REGEX.test(username))
    }, [username])

    useEffect(() => {
        setValidPassword(PWD_REGEX.test(password))
    }, [password])

    useEffect(() => {
        if (isSuccess) {
            setUsername('')
            setPassword('')
            setRoles([])
            setFirstname('')
            setLastname('')
            setFullname('')
            setGender('')
            setNic('')
            setDob('')
            setPob('')
            setAge('')
            setNationality('')
            setReligion('')
            setDepartment('')
            setDatejoin('')
            setEmptype('')
            setEmpid('')
            setContact('')
            setEmail('')
            setAddress('')

            // navigate('/dash/admin/users')
            window.location.replace('http://localhost:3000/dash/admin/users')
        
        }
    }, [isSuccess])


    const onUsernameChanged = e => setUsername(e.target.value)
    const onPasswordChanged = e => setPassword(e.target.value)

    const onRolesChanged = e => {
        const values = Array.from(
            e.target.selectedOptions, //HTMLCollection 
            (option) => option.value
        )
        setRoles(values)
    }

    const onFirstnameChanged = e => setFirstname(e.target.value)
    const onLasttnameChanged = e => setLastname(e.target.value)
    const onFullnameChanged = e => setFullname(e.target.value)
    const onGenderChanged = e => setGender(e.target.value)
    const onNicChanged = e => setNic(e.target.value)
    const onDobChanged = e => setDob(e.target.value)
    const onPobChanged = e => setPob(e.target.value)
    const onAgeChanged = e => setAge(e.target.value)
    const onNationalityChanged = e => setNationality(e.target.value)
    const onReligionChanged = e => setReligion(e.target.value)
    const onDepartmentChanged = e => setDepartment(e.target.value)
    const onDatejoinChanged = e => setDatejoin(e.target.value)
    const onEmptypeChanged = e => setEmptype(e.target.value)
    const onEmpidChanged = e => setEmpid(e.target.value)
    const onContactChanged = e => setContact(e.target.value)
    const onEmailChanged = e => setEmail(e.target.value)
    const onAddressChanged = e => setAddress(e.target.value)


    const canSave = [roles.length, validUsername, validPassword].every(Boolean) && !isLoading

    const onSaveUserClicked = async (e) => {
        e.preventDefault()
        if (canSave) {
            await addNewUser({
                username, password, roles, firstname, lastname, fullname,
                gender, NIC, date_of_birth, place_of_birth, age, nationality, religion, department,
                date_joined, employee_type, empID, contact, email, address
            })
        }
    }

    const options = Object.values(ROLES).map(role => {
        return (
            <option
                key={role}
                value={role}

            > {role}</option >
        )
    })

    const errClass = isError ? "errmsg" : "offscreen"
    const validUserClass = !validUsername ? 'form__input--incomplete' : ''
    const validPwdClass = !validPassword ? 'form__input--incomplete' : ''
    const validRolesClass = !Boolean(roles.length) ? 'form__input--incomplete' : ''


    const content = (
        <>
            <button type="button" class="btn btn-primary col-2 " data-bs-toggle="modal" data-bs-target="#adduser">
                Add User
            </button>
            <div class="modal fade" id="adduser" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="ReqLeaveFormLabel" aria-hidden="true">
                <div class="modal-dialog modal-dialog-centered">
                    <div class="modal-content">
                        <div class="modal-header">
                            <h5 class="modal-title" id="staticBackdropLabel">User</h5>
                            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div class="modal-body">
                            <form onSubmit={onSaveUserClicked}>
                                <div class="row">
                                    <div class="col-6">

                                        <label class="form-label" htmlFor="username">
                                            Username: [3-20 letters]</label>
                                        <input type="text"
                                            class="form-control"
                                            id="username"
                                            name="username"

                                            autoComplete="off"
                                            required
                                            value={username}
                                            onChange={onUsernameChanged} />

                                    </div>


                                    <div class="col-6">


                                        <label class="form-label" htmlFor="password">
                                            Password: </label>
                                        <input
                                            class="form-control"
                                            id="password"
                                            name="password"
                                            type="password"
                                            required
                                            value={password}
                                            onChange={onPasswordChanged}
                                        />

                                    </div>


                                    <div class="col-6">


                                        <label class="form-label" htmlFor="roles">
                                            ASSIGNED ROLES:</label>
                                        <select
                                            id="roles"
                                            name="roles"
                                            class={`form__select `}
                                            multiple={true}
                                            size="3"
                                            required
                                            value={roles}
                                            onChange={onRolesChanged}
                                        >
                                            {options}
                                        </select>

                                    </div>


                                    <div class="col-6">

                                        <label class="form-label" htmlFor="firstname">
                                            First Name: </label>
                                        <input
                                            class="form-control"
                                            id="firstname"
                                            name="firstname"
                                            type="text"
                                            autoComplete="off"
                                            required
                                            value={firstname}
                                            onChange={onFirstnameChanged}
                                        />
                                    </div>


                                    <div class="col-6">

                                        <label class="form-label" htmlFor="lastname">
                                            Last Name: </label>
                                        <input
                                            class="form-control"
                                            id="lastname"
                                            name="lastname"
                                            type="text"
                                            autoComplete="off"
                                            required
                                            value={lastname}
                                            onChange={onLasttnameChanged}
                                        /> </div>

                                    <div class="col-6">


                                        <label class="form-label" htmlFor="fullname">
                                            Full Name: </label>
                                        <input
                                            class="form-control"
                                            id="fullname"
                                            name="fullname"
                                            type="text"
                                            autoComplete="off"
                                            required
                                            value={fullname}
                                            onChange={onFullnameChanged}
                                        />
                                    </div>

                                    <div class="col-6">


                                        <label class="form-label" htmlFor="gender">
                                            Gender: </label>
                                        <input
                                            class="form-control"
                                            id="gender"
                                            name="gender"
                                            type="text"
                                            autoComplete="off"
                                            required
                                            value={gender}
                                            onChange={onGenderChanged}
                                        />
                                    </div>

                                    <div class="col-6">


                                        <label class="form-label" htmlFor="NIC">
                                            NIC: </label>
                                        <input
                                            class="form-control"
                                            id="NIC"
                                            name="NIC"
                                            type="number"
                                            autoComplete="off"
                                            required
                                            value={NIC}
                                            onChange={onNicChanged}
                                        />
                                    </div>


                                    <div class="col-6">

                                        <label class="form-label" htmlFor="date_of_birth">
                                            Date of birth: </label>
                                        <input
                                            class="form-control"
                                            id="date_of_birth"
                                            name="date_of_birth"
                                            type="date"
                                            autoComplete="off"
                                            required
                                            value={date_of_birth}
                                            onChange={onDobChanged}
                                        />
                                    </div>

                                    <div class="col-6">

                                        <label class="form-label" htmlFor="place_of_birth">
                                            Place of birth: </label>
                                        <input
                                            class="form-control"
                                            id="place_of_birth"
                                            name="place_of_birth"
                                            type="text"
                                            autoComplete="off"
                                            required
                                            value={place_of_birth}
                                            onChange={onPobChanged}
                                        />
                                    </div>

                                    <div class="col-6">

                                        <label class="form-label" htmlFor="age">
                                            Age: </label>
                                        <input
                                            class="form-control"
                                            id="age"
                                            name="age"
                                            type="numbe"
                                            autoComplete="off"
                                            required
                                            value={age}
                                            onChange={onAgeChanged}
                                        />
                                    </div>

                                    <div class="col-6">

                                        <label class="form-label" htmlFor="nationality">
                                            Nationality: </label>
                                        <input
                                            class="form-control"
                                            id="nationality"
                                            name="nationality"
                                            type="text"
                                            autoComplete="off"
                                            required
                                            value={nationality}
                                            onChange={onNationalityChanged}
                                        /> </div>

                                    <div class="col-6">

                                        <label class="form-label" htmlFor="religion">
                                            Religion: </label>
                                        <input
                                            class="form-control"
                                            id="religion"
                                            name="religion"
                                            type="text"
                                            autoComplete="off"
                                            required
                                            value={religion}
                                            onChange={onReligionChanged}
                                        /> </div>

                                    <div class="col-6">

                                        <label class="form-label" htmlFor="department">
                                            Department: </label>
                                        <input
                                            class="form-control"
                                            id="department"
                                            name="department"
                                            type="text"
                                            autoComplete="off"
                                            required
                                            value={department}
                                            onChange={onDepartmentChanged}
                                        />
                                    </div>

                                    <div class="col-6">

                                        <label class="form-label" htmlFor="date_joined">
                                            Date Joined: </label>
                                        <input
                                            class="form-control"
                                            id="date_joined"
                                            name="date_joined"
                                            type="date"
                                            autoComplete="off"
                                            required
                                            value={date_joined}
                                            onChange={onDatejoinChanged}
                                        />
                                    </div>

                                    <div class="col-6">

                                        <label class="form-label" htmlFor="employee_type">
                                            Employee type: </label>
                                        <input
                                            class="form-control"
                                            id="employee_type"
                                            name="employee_type"
                                            type="text"
                                            autoComplete="off"
                                            required
                                            value={employee_type}
                                            onChange={onEmptypeChanged}
                                        /> </div>

                                    <div class="col-6">

                                        <label class="form-label" htmlFor="empID">
                                            Employee ID: </label>
                                        <input
                                            class="form-control"
                                            id="empID"
                                            name="empID"
                                            type="text"
                                            autoComplete="off"
                                            required
                                            value={empID}
                                            onChange={onEmpidChanged}
                                        /> </div>

                                    <div class="col-6">

                                        <label class="form-label" htmlFor="contact">
                                            Contact: </label>
                                        <input
                                            class="form-control"
                                            id="contact"
                                            name="contact"
                                            type="number"
                                            autoComplete="off"
                                            required
                                            value={contact}
                                            onChange={onContactChanged}
                                        /> </div>

                                    <div class="col-6">


                                        <label class="form-label" htmlFor="email">
                                            Email: </label>
                                        <input
                                            class="form-control"
                                            id="email"
                                            name="email"
                                            type="email"
                                            autoComplete="off"
                                            required
                                            value={email}
                                            onChange={onEmailChanged}
                                        /> </div>

                                    <div class="col-6">

                                        <label class="form-label" htmlFor="address">
                                            Address: </label>
                                        <input
                                            class="form-control"
                                            id="address"
                                            name="address"
                                            type="text"
                                            autoComplete="off"
                                            required
                                            value={address}
                                            onChange={onAddressChanged}
                                        /></div>
                                    <div class="modal-footer">
                                        <button type="button" class="btn btn-danger" data-bs-dismiss="modal">Cancel</button>
                                        <button type="submit" class="btn btn-primary">Add User</button>
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )

    return content
}
export default NewUserForm