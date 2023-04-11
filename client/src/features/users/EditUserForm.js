import React from 'react'
import { useState, useEffect } from "react"
import { useUpdateUserMutation, useDeleteUserMutation } from "./usersApiSlice"
import { useNavigate } from "react-router-dom"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSave, faTrashCan } from "@fortawesome/free-solid-svg-icons"
import { ROLES } from "../../config/roles"


const USER_REGEX = /^[A-z]{3,20}$/
const PWD_REGEX = /^[A-z0-9!@#$%]{4,12}$/



const EditUserForm = ({ user }) => {

    const [updateUser, {
        isLoading,
        isSuccess,
        isError,
        error
    }] = useUpdateUserMutation()

    const [deleteUser, {
        isSuccess: isDelSuccess,
        isError: isDelError,
        error: delerror
    }] = useDeleteUserMutation()

    const navigate = useNavigate()


    const [username, setUsername] = useState(user.username)
    const [validUsername, setValidUsername] = useState(false)
    const [password, setPassword] = useState('')
    const [validPassword, setValidPassword] = useState(false)
    const [roles, setRoles] = useState(user.roles)
    const [active, setActive] = useState(user.active)
    const [firstname, setFirstname] = useState(user.firstname)
    const [lastname, setLastname] = useState(user.lastname)
    const [fullname, setFullname] = useState(user.fullname)
    const [gender, setGender] = useState(user.gender)
    const [NIC, setNic] = useState(user.NIC)
    const [date_of_birth, setDob] = useState(user.date_of_birth)
    const [place_of_birth, setPob] = useState(user.place_of_birth)
    const [age, setAge] = useState(user.age)
    const [nationality, setNationality] = useState(user.address)
    const [religion, setReligion] = useState(user.religion)
    const [department, setDepartment] = useState(user.department)
    const [date_joined, setDatejoin] = useState(user.date_joined)
    const [employee_type, setEmptype] = useState(user.employee_type)
    const [empID, setEmpid] = useState(user.empID)
    const [contact, setContact] = useState(user.contact)
    const[email, setEmail]= useState(user.email)
    const [address, setAddress] = useState(user.address)
   

    useEffect(() => {
        setValidUsername(USER_REGEX.test(username))
    }, [username])

    useEffect(() => {
        setValidPassword(PWD_REGEX.test(password))
    }, [password])

   
    useEffect(() => {
        console.log(isSuccess)
        if (isSuccess || isDelSuccess) {
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

    }, [isSuccess, isDelSuccess, navigate])


    const onUsernameChanged = e => setUsername(e.target.value)
    const onPasswordChanged = e => setPassword(e.target.value)

    const onRolesChanged = e => {
        const values = Array.from(
            e.target.selectedOptions, //HTMLCollection 
            (option) => option.value
        )
        setRoles(values)
    }

    const onActiveChanged = () => setActive(prev => !prev)

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
    

    

    const onSaveUserClicked = async (e) => {
        if (password) {
            await updateUser({ id: user.id, username, password,active, roles,firstname,
                lastname,
                fullname,
                 gender,
                NIC,
                date_of_birth,
                place_of_birth,
                age,
                 nationality,
                 religion,
                department,
                 date_joined,
                employee_type,
                empID,
                contact,
                email,
                 address
                  })
        } else {
            await updateUser({ id: user.id, username, roles, active,firstname,
                lastname,
                fullname,
                 gender,
                NIC,
                date_of_birth,
                place_of_birth,
                age,
                 nationality,
                 religion,
                department,
                 date_joined,
                employee_type,
                empID,
                contact,
                email,
                 address
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

    const onDeleteUserClicked = async () => {
        await deleteUser({ id: user.id })
    }
    
    let canSave
    if (password) {
        canSave = [roles.length, validUsername, validPassword].every(Boolean) && !isLoading
    } else {
        canSave = [roles.length, validUsername].every(Boolean) && !isLoading
    }

    const errClass = (isError || isDelError) ? "errmsg" : "offscreen"
    const validUserClass = !validUsername ? 'form__input--incomplete' : ''
    const validPwdClass = password && !validPassword ? 'form__input--incomplete' : ''
    const validRolesClass = !Boolean(roles.length) ? 'form__input--incomplete' : ''

    const errContent = (error?.data?.message || delerror?.data?.message) ?? ''

    const content = (
        <>
            <p className={errClass}>{errContent}</p>

            <form className="form" onSubmit={e => e.preventDefault()}>
                <div className="form__title-row">
                    <h2>Edit User</h2>
                    <div className="form__action-buttons">
                        <button
                            className="icon-button"
                            title="Save"
                            onClick={onSaveUserClicked}
                            disabled={!canSave}
                        >
                            <FontAwesomeIcon icon={faSave} />
                        </button>
                        <button
                            className="icon-button"
                            title="Delete"
                            onClick={onDeleteUserClicked}
                        >
                            <FontAwesomeIcon icon={faTrashCan} />
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
                    value={username}
                    onChange={onUsernameChanged}
                />

                <label className="form__label" htmlFor="password">
                    Password: <span className="nowrap">[empty = no change]</span> <span className="nowrap">[4-12 chars incl. !@#$%]</span></label>
                <input
                    className={`form__input ${validPwdClass}`}
                    id="password"
                    name="password"
                    type="password"
                    value={password}
                    onChange={onPasswordChanged}
                />

                    <label className="form__label form__checkbox-container" htmlFor="user-active">
                    ACTIVE:
                    <input
                        className="form__checkbox"
                        id="user-active"
                        name="user-active"
                        type="checkbox"
                        checked={active}
                        onChange={onActiveChanged}
                    />
                </label>

                <label className="form__label" htmlFor="roles">
                    ASSIGNED ROLES:</label>
                <select
                    id="roles"
                    name="roles"
                    className={`form__select ${validRolesClass}`}
                    multiple={true}
                    size="3"
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
                    value={gender}
                    onChange={onGenderChanged}
                />

                <label className="form__label" htmlFor="NIC">
                    NIC: <span className="nowrap"></span></label>
                <input
                    className="form__select"
                    id="NIC"
                    name="NIC"
                    type="text"
                    autoComplete="off"
                    value={NIC}
                    onChange={onNicChanged}
                />

                <label className="form__label" htmlFor="date_of_birth">
                    Date of birth: <span className="nowrap"></span></label>
                <input
                    className="form__select"
                    id="date_of_birth"
                    name="date_of_birth"
                    type="text"
                    autoComplete="off"
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
                    value={place_of_birth}
                    onChange={onPobChanged}
                />

                <label className="form__label" htmlFor="age">
                   Age: <span className="nowrap"></span></label>
                <input
                    className="form__select"
                    id="age"
                    name="age"
                    type="text"
                    autoComplete="off"
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
                    value={department}
                    onChange={onDepartmentChanged}
                />

                <label className="form__label" htmlFor="date_joined">
                Date Joined: <span className="nowrap"></span></label>
                <input
                    className="form__select"
                    id="date_joined"
                    name="date_joined"
                    type="text"
                    autoComplete="off"
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
                    value={empID}
                    onChange={onEmpidChanged}
                />

                <label className="form__label" htmlFor="contact">
                Contact: <span className="nowrap"></span></label>
                <input
                    className="form__select"
                    id="contact"
                    name="contact"
                    type="text"
                    autoComplete="off"
                    value={contact}
                    onChange={onContactChanged}
                />

                <label className="form__label" htmlFor="email">
                Email: <span className="nowrap"></span></label>
                <input
                    className="form__select"
                    id="email"
                    name="email"
                    type="text"
                    autoComplete="off"
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
                    value={address}
                    onChange={onAddressChanged}
                />

              



            </form>
        </>
    )

    return content

}

export default EditUserForm

















