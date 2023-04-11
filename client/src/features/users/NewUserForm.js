import { useState, useEffect } from "react"
import { useAddNewUserMutation } from "./usersApiSlice"
import { useNavigate } from "react-router-dom"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSave } from "@fortawesome/free-solid-svg-icons"
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
    const[email, setEmail]= useState('')
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
           
            navigate('/dash/users')
        }
    }, [isSuccess, navigate])


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
            await addNewUser({ username, password, roles, firstname, lastname, fullname,
             gender,NIC,date_of_birth,place_of_birth,age,nationality,religion,department,
            date_joined,employee_type,empID,contact,email,address})
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
            <p className={errClass}>{error?.data?.message}</p>

            <form className="form" onSubmit={onSaveUserClicked}>
                <div className="form__title-row">
                    <h2>New User</h2>
                    <div className="form__action-buttons">
                        <button
                            className="icon-button"
                            title="Save"
                            disabled={!canSave}
                        >
                            <FontAwesomeIcon icon={faSave} />
                        </button>
                    </div>
                </div>
                <label className="form__label" htmlFor="username">
                    Username: <span className="nowrap">[3-20 letters]</span></label>
                <input
                    className={`form__input ${validUserClass}`}
                    id="username"
                    name="username"
                    type="text"
                    autoComplete="off"
                    required
                    value={username}
                    onChange={onUsernameChanged}
                />

                <label className="form__label" htmlFor="password">
                    Password: <span className="nowrap">[4-12 chars incl. !@#$%]</span></label>
                <input
                    className={`form__input ${validPwdClass}`}
                    id="password"
                    name="password"
                    type="password"
                    required
                    value={password}
                    onChange={onPasswordChanged}
                />

                <label className="form__label" htmlFor="roles">
                    ASSIGNED ROLES:</label>
                <select
                    id="roles"
                    name="roles"
                    className={`form__select ${validRolesClass}`}
                    multiple={true}
                    size="3"
                    required
                    value={roles}
                    onChange={onRolesChanged}
                >
                    {options}
                </select>

                <label className="form__label" htmlFor="firstname">
                    First Name: <span className="nowrap"></span></label>
                <input
                    className="form__select"
                    id="firstname"
                    name="firstname"
                    type="text"
                    autoComplete="off"
                    required
                    value={firstname}
                    onChange={onFirstnameChanged}
                />

                <label className="form__label" htmlFor="lastname">
                    Last Name: <span className="nowrap"></span></label>
                <input
                    className="form__select"
                    id="lastname"
                    name="lastname"
                    type="text"
                    autoComplete="off"
                    required
                    value={lastname}
                    onChange={onLasttnameChanged}
                />

                <label className="form__label" htmlFor="fullname">
                    Full Name: <span className="nowrap"></span></label>
                <input
                    className="form__select"
                    id="fullname"
                    name="fullname"
                    type="text"
                    autoComplete="off"
                    required
                    value={fullname}
                    onChange={onFullnameChanged}
                />

                <label className="form__label" htmlFor="gender">
                    Gender: <span className="nowrap"></span></label>
                <input
                    className="form__select"
                    id="gender"
                    name="gender"
                    type="text"
                    autoComplete="off"
                    required
                    value={gender}
                    onChange={onGenderChanged}
                />

                <label className="form__label" htmlFor="NIC">
                    NIC: <span className="nowrap"></span></label>
                <input
                    className="form__select"
                    id="NIC"
                    name="NIC"
                    type="number"
                    autoComplete="off"
                    required
                    value={NIC}
                    onChange={onNicChanged}
                />

                <label className="form__label" htmlFor="date_of_birth">
                    Date of birth: <span className="nowrap"></span></label>
                <input
                    className="form__select"
                    id="date_of_birth"
                    name="date_of_birth"
                    type="date"
                    autoComplete="off"
                    required
                    value={date_of_birth}
                    onChange={onDobChanged}
                />

                <label className="form__label" htmlFor="place_of_birth">
                    Place of birth: <span className="nowrap"></span></label>
                <input
                    className="form__select"
                    id="place_of_birth"
                    name="place_of_birth"
                    type="text"
                    autoComplete="off"
                    required
                    value={place_of_birth}
                    onChange={onPobChanged}
                />

                <label className="form__label" htmlFor="age">
                   Age: <span className="nowrap"></span></label>
                <input
                    className="form__select"
                    id="age"
                    name="age"
                    type="numbe"
                    autoComplete="off"
                    required
                    value={age}
                    onChange={onAgeChanged}
                />

                <label className="form__label" htmlFor="nationality">
                Nationality: <span className="nowrap"></span></label>
                <input
                    className="form__select"
                    id="nationality"
                    name="nationality"
                    type="text"
                    autoComplete="off"
                    required
                    value={nationality}
                    onChange={onNationalityChanged}
                />

                <label className="form__label" htmlFor="religion">
                Religion: <span className="nowrap"></span></label>
                <input
                    className="form__select"
                    id="religion"
                    name="religion"
                    type="text"
                    autoComplete="off"
                    required
                    value={religion}
                    onChange={onReligionChanged}
                />

                <label className="form__label" htmlFor="department">
                Department: <span className="nowrap"></span></label>
                <input
                    className="form__select"
                    id="department"
                    name="department"
                    type="text"
                    autoComplete="off"
                    required
                    value={department}
                    onChange={onDepartmentChanged}
                />

                <label className="form__label" htmlFor="date_joined">
                Date Joined: <span className="nowrap"></span></label>
                <input
                    className="form__select"
                    id="date_joined"
                    name="date_joined"
                    type="date"
                    autoComplete="off"
                    required
                    value={date_joined}
                    onChange={onDatejoinChanged}
                />

                <label className="form__label" htmlFor="employee_type">
                Employee type: <span className="nowrap"></span></label>
                <input
                    className="form__select"
                    id="employee_type"
                    name="employee_type"
                    type="text"
                    autoComplete="off"
                    required
                    value={employee_type}
                    onChange={onEmptypeChanged}
                />

                <label className="form__label" htmlFor="empID">
                Employee ID: <span className="nowrap"></span></label>
                <input
                    className="form__select"
                    id="empID"
                    name="empID"
                    type="text"
                    autoComplete="off"
                    required
                    value={empID}
                    onChange={onEmpidChanged}
                />

                <label className="form__label" htmlFor="contact">
                Contact: <span className="nowrap"></span></label>
                <input
                    className="form__select"
                    id="contact"
                    name="contact"
                    type="number"
                    autoComplete="off"
                    required
                    value={contact}
                    onChange={onContactChanged}
                />

                <label className="form__label" htmlFor="email">
                Email: <span className="nowrap"></span></label>
                <input
                    className="form__select"
                    id="email"
                    name="email"
                    type="email"
                    autoComplete="off"
                    required
                    value={email}
                    onChange={onEmailChanged}
                />

                <label className="form__label" htmlFor="address">
                Address: <span className="nowrap"></span></label>
                <input
                    className="form__select"
                    id="address"
                    name="address"
                    type="text"
                    autoComplete="off"
                    required
                    value={address}
                    onChange={onAddressChanged}
                />


            </form>
        </>
    )

    return content
}
export default NewUserForm