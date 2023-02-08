import { Button, Card, TextField, CardActionArea, CardMedia, CardContent, Typography } from "@mui/material";
import './collaborators.scss';
import { useEffect,useState } from "react";
import { MenuItem } from "@mui/material";
import { fetchJson } from "../fetch";

const Collaborators = () => {

    const { REACT_APP_USERS } = process.env;
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
            users.map((user) => {
                if (searchOptions.category != "") {
                    if (user.category == searchOptions.category)
                        sortedUser.push(user);
                }
                if (searchOptions.search != "") {
                    if (user.city.toLowerCase().includes(searchOptions.search.toLowerCase()) || user.country.toLowerCase().includes(searchOptions.search.toLowerCase()))
                        sortedUser.push(user);
                }
                if (searchOptions.lastname != "") {
                    if (user.lastname == searchOptions.lastname)
                        sortedUser.push(user);
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

    return (
        <div>
            <div className="onsaitplus">
            <TextField style={{width: 200, margin: '20px auto'}} id="search" name="search" label="search" inputProps={{ style: { color: "black" } }} onChange={(e) => handleChange(e)}/>

            <TextField style={{width: 200, margin: '20px auto'}} id="lastname" name="lastname" label="lastname"  value={searchOptions.lastname} onChange={(e) => handleChange(e)} select>
                { users.map((user, index) => {
                    return (
                        <MenuItem key={index} value={user.lastname}>{user.lastname}</MenuItem>
                    );
                })}
            </TextField>
            <TextField style={{width: 200, margin: '20px auto'}} id="category" label="category" name="category" value={searchOptions.category} onChange={(e) => handleChange(e)} select>
                <MenuItem value="Marketing">Marketing</MenuItem>
                <MenuItem value="Technique">Technique</MenuItem>
                <MenuItem value="Client">Client</MenuItem>
            </TextField>
            </div>
            <div className="collabs">
            {sortUsers.map((user, index) => {
                return(
                    <Card className="cardCollab" key={index} sx={{ maxWidth: 345 }}>
                        <CardActionArea>
                            <CardMedia
                            component="img"
                            height="140"
                            image={user.photo}
                            alt={`${user.firstname} ${user.lastname}`}
                            />
                            <CardContent>
                                <Typography gutterBottom variant="h5" component="div">
                                    {`${user.firstname} ${user.lastname} (${user.birthdate})`}
                                </Typography>
                                <Typography variant="body2" color="text.secondary">
                                    {`${user.city}, ${user.country}`}
                                </Typography>
                                <Typography variant="body2" color="text.secondary">
                                    {`${user.email}`}
                                </Typography>
                                <Typography variant="body2" color="text.secondary">
                                    {`${user.phone}`}
                                </Typography>
                                <Typography variant="body2" color="text.secondary">
                                    {`Anniversaire: ${user.birthdate}`}
                                </Typography>
                                
                            </CardContent>
                        </CardActionArea>
                        { user.isAdmin &&
                            <>
                                <Button style={{margin: '0 auto', display: "flex"}}>Edit</Button>
                                <Button style={{margin: '0 auto', display: "flex"}}>Delete</Button>
                            </>
                        }
                    </Card>
                );
            })}
            </div>
        </div>
    );
};

export default Collaborators;