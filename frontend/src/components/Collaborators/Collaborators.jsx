import { Button, Card, TextField, CardActionArea, CardMedia, CardContent, Typography } from "@mui/material";
import { useContext, useEffect,useState } from "react";
import { MenuItem } from "@mui/material";
import { fetchDelete, fetchJson } from "../fetch";
import AppContext from "../../context/AppContext";
import { useNavigate } from "react-router-dom";

const Collaborators = () => {

    const { REACT_APP_USERS } = process.env;
    const { user } = useContext(AppContext);
    const navigate = useNavigate();
    const [users, setUsers] = useState([]);
    const [sortUsers, setSortUsers] = useState([]);
    const [searchOptions, setSearchOptions] = useState({
        category: "",
        lastname: "",
        search: ""
    });

    const getUsers = async () => {
        return await fetchJson(REACT_APP_USERS)
    }

    useEffect(() => {
        console.log(user)
        getUsers()
        .then((response) => {
            setUsers(response);
            setSortUsers(response);
        })
    }, []);

    useEffect(() => {
        let sortedUser = [];
        if (
            searchOptions.category == ""
            && searchOptions.search == ""
            && searchOptions.lastname == ""
        ) {
            sortedUser = [...users];
        }
        else {
            users.map((person) => {
                if (searchOptions.category != "") {
                    if (person.category == searchOptions.category)
                        sortedUser.push(person);
                }
                if (searchOptions.search != "") {
                    if (person.city.toLowerCase().includes(searchOptions.search.toLowerCase()) || user.country.toLowerCase().includes(searchOptions.search.toLowerCase()))
                        sortedUser.push(person);
                }
                if (searchOptions.lastname != "") {
                    if (person.lastname == searchOptions.lastname)
                        sortedUser.push(person);
                }
            })
        }
        setSortUsers(sortedUser);
    }, [searchOptions])

    const handleChange = (e) => {
        setSearchOptions({
            ...searchOptions,
            [e.target.name]: e.target.value
        });
    }

    const deleteUser = async (id) => {
        await fetchDelete(id)
        .then(() => {
            setUsers(getUsers());
            setSortUsers(users);
        })
    }

    return (
        <div>
            <TextField style={{width: 100}} id="search" name="search" label="search" onChange={(e) => handleChange(e)}/>

            <TextField style={{width: 100}} id="lastname" name="lastname" label="lastname"  value={searchOptions.lastname} onChange={(e) => handleChange(e)} select>
                { users.map((person, index) => {
                    return (
                        <MenuItem key={index} value={person.lastname}>{person.lastname}</MenuItem>
                    );
                })}
            </TextField>
            <TextField style={{width: 100}} id="category" label="category" name="category" value={searchOptions.category} onChange={(e) => handleChange(e)} select>
                <MenuItem value="Marketing">Marketing</MenuItem>
                <MenuItem value="Technique">Technique</MenuItem>
                <MenuItem value="Client">Client</MenuItem>
            </TextField>
            {sortUsers.map((person, index) => {
                return(
                    <Card key={index} sx={{ maxWidth: 345 }}>
                        <CardActionArea>
                            <CardMedia
                            component="img"
                            height="140"
                            image={person.photo}
                            alt={`${person.firstname} ${person.lastname}`}
                            />
                            <CardContent>
                                <Typography gutterBottom variant="h5" component="div">
                                    {`${person.firstname} ${person.lastname} (${person.birthdate})`}
                                </Typography>
                                <Typography variant="body2" color="text.secondary">
                                    {`${person.city}, ${person.country}`}
                                </Typography>
                                <Typography variant="body2" color="text.secondary">
                                    {`${person.email}`}
                                </Typography>
                                <Typography variant="body2" color="text.secondary">
                                    {`${person.phone}`}
                                </Typography>
                                <Typography variant="body2" color="text.secondary">
                                    {`Anniversaire: ${person.birthdate}`}
                                </Typography>
                                
                            </CardContent>
                        </CardActionArea>
                        { user && user.isAdmin &&
                            <>
                                <Button onClick={() => {
                                    navigate(`/users/${person._id.toString()}`);
                                }
                                }>
                                    Edit
                                </Button>
                                <Button onClick={() => {
                                    deleteUser((person._id + ""));
                                }}>
                                    Delete
                                </Button>
                            </>
                        }
                    </Card>
                );
            })}
        </div>
    );
};

export default Collaborators;