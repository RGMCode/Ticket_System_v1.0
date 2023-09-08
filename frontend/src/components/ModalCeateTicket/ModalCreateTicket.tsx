import {Button, Col, Form, Modal} from "react-bootstrap";
import {ChangeEvent, FormEvent, useEffect, useState} from "react";
import axios from "axios";
import {TicketData, UserData} from "../../Pages/TicketOverview/TicketOverview.tsx"
import Row from "react-bootstrap/Row";

type ModalCreate = {
    onHide: () => void;
    show: boolean;
    setTickets: (newTicket: TicketData[]) => void;
}

export default function ModalCreateTicket(props: ModalCreate) {

    const [userData, setUserData] = useState<UserData | null>(null);
    const [, setUserLoginname] = useState<string | null>(null); // Hier sollte es ein string sein
    const [userID, setUserID] = useState<string | null>(null); // Hier sollte es ein string sein

    async function getUserData() {
        try {
            const response = await axios({
                method: "get",
                url: "http://localhost:5173/api/user/me2",
            });
            console.log("Antwort von /api/user/me2:", response.data);
            setUserLoginname(response.data);
            const res = await axios({
                method: 'get',
                url: `http://localhost:5173/api/user/user/${response.data}`,
            });
            console.log("Antwort von /api/user/user/:id", res.data);
            setUserID(res.data.id);
            setUserData(res.data);
        } catch (error) {
            console.log("Ein Fehler ist aufgetreten", error);
        }
    }

    useEffect(() => {
        getUserData()
    }, []);

    useEffect(() => {
        if (userData) {
            setUserTitel(userData.userTitle || "");
            setUserSalutation(userData.userSalutation || "");
            setUserLastName(userData.userLastName || "");
            setUserFirstName(userData.userFirstName || "");
            setUserDepartment(userData.userDepartment || "");
            setUserLocation(userData.userLocation || "");
            setUserBuilding(userData.userBuilding || "");
            setUserRoom(userData.userRoom || "");
            setUserPhoneNumber(userData.userPhoneNumber || "");
            setUserEMail(userData.userEMail || "");
        }
    }, [userData]);

    const [userTitel, setUserTitel] = useState("")
    const [userSalutation, setUserSalutation] = useState("")

    const [userLastName, setUserLastName] = useState("")
    const [userFirstName, setUserFirstName] = useState("")

    const [userDepartment, setUserDepartment] = useState("")
    const [userLocation, setUserLocation] = useState("")

    const [userBuilding, setUserBuilding] = useState("")
    const [userRoom, setUserRoom] = useState("")

    const [userPhoneNumber, setUserPhoneNumber] = useState("")
    const [userEMail, setUserEMail] = useState("")

    const [customerHeadline, setCustomerHeadline] = useState("")
    const [customerDescription, setCustomerDescription] = useState("")

    function onChangeHandlerUserTitel(event: ChangeEvent<HTMLInputElement>) {
        setUserTitel(event.target.value)
    }

    function onChangeHandlerUserSalutation(event: ChangeEvent<HTMLInputElement>) {
        setUserSalutation(event.target.value)

    }

    function onChangeHandlerUserLastName(event: ChangeEvent<HTMLInputElement>) {
        setUserLastName(event.target.value)
    }

    function onChangeHandlerUserFirstName(event: ChangeEvent<HTMLInputElement>) {
        setUserFirstName(event.target.value)
    }

    function onChangeHandlerUserDepartment(event: ChangeEvent<HTMLInputElement>) {
        setUserDepartment(event.target.value)
    }

    function onChangeHandlerUserLocation(event: ChangeEvent<HTMLInputElement>) {
        setUserLocation(event.target.value)
    }

    function onChangeHandlerUserBuilding(event: ChangeEvent<HTMLInputElement>) {
        setUserBuilding(event.target.value)
    }

    function onChangeHandlerUserRoom(event: ChangeEvent<HTMLInputElement>) {
        setUserRoom(event.target.value)
    }

    function onChangeHandlerUserPhoneNumber(event: ChangeEvent<HTMLInputElement>) {
        setUserPhoneNumber(event.target.value)
    }

    function onChangeHandlerUserEMail(event: ChangeEvent<HTMLInputElement>) {
        setUserEMail(event.target.value)
    }

    function onChangeHandlerCustomerHeadline(event: ChangeEvent<HTMLInputElement>) {
        setCustomerHeadline(event.target.value)
    }

    function onChangeHandlerCustomerDescription(event: ChangeEvent<HTMLTextAreaElement>) {
        setCustomerDescription(event.target.value)
    }

    function createNewTicket(event: FormEvent<HTMLFormElement>) {
        event.preventDefault();
        axios.post("/api/ticket", {
            userID: userID,
            userTitle: userTitel,
            userSalutation: userSalutation,
            userLastName: userLastName,
            userFirstName: userFirstName,
            userDepartment: userDepartment,
            userLocation: userLocation,
            userBuilding: userBuilding,
            userRoom: userRoom,
            userPhoneNumber: userPhoneNumber,
            userEMail: userEMail,
            customerHeadline: customerHeadline,
            customerDescription: customerDescription
        })
            .then(() => {
                axios.get('/api/ticket')
                    .then((response) => props.setTickets(response.data))
                console.log(props.setTickets)
            })
            .catch((error) => console.log(error));
    }

    return (
        <div>
            <Modal
                {...props}
                size="xl"
                aria-labelledby="contained-modal-title-vcenter"
                centered
            >
                <Modal.Header closeButton>
                    <Modal.Title id="contained-modal-title-vcenter">
                        <h1>Ticket erstellen</h1>
                    </Modal.Title>
                </Modal.Header>

                <Modal.Body>
                    <Form onSubmit={createNewTicket}>
                        <Form.Group as={Row} className="mb-3" controlId="formPlaintextPassword">
                            <Row>
                                <Col>
                                    <Form.Label column sm="2">
                                        Titel:
                                    </Form.Label>
                                    <input style={{width: '300px'}} type={"text"} id={"userTitel"}
                                           value={userData?.userTitle} onChange={onChangeHandlerUserTitel}/>
                                </Col>
                                <Col>
                                    <Form.Label column sm="2">
                                        Anrede:
                                    </Form.Label>
                                    <input style={{width: '300px'}} type={"text"} id={"userSalutation"}
                                           value={userData?.userSalutation} onChange={onChangeHandlerUserSalutation}/>
                                </Col>
                            </Row>
                        </Form.Group>


                        <Form.Group as={Row} className="mb-3" controlId="formPlaintextPassword">
                            <Row>
                                <Col>
                                    <Form.Label column sm="2">
                                        Nachname:
                                    </Form.Label>
                                    <input style={{width: '300px'}} type="text" id={"userLastName"}
                                           value={userData?.userLastName} onChange={onChangeHandlerUserLastName}
                                           required={true}/>
                                </Col>
                                <Col>
                                    <Form.Label column sm="2">
                                        Vorname:
                                    </Form.Label>
                                    <input style={{width: '300px'}} type="text" id={"userFirstName"}
                                           value={userData?.userFirstName} onChange={onChangeHandlerUserFirstName}
                                           required={true}/>
                                </Col>
                            </Row>
                        </Form.Group>


                        <Form.Group as={Row} className="mb-3" controlId="formPlaintextPassword">
                            <Row>
                                <Col>
                                    <Form.Label column sm="2">
                                        Standort:
                                    </Form.Label>
                                    <input style={{width: '300px'}} type="text" id={"userLocation"}
                                           value={userData?.userLocation} onChange={onChangeHandlerUserLocation}/>
                                </Col>
                                <Col>
                                    <Form.Label column sm="2">
                                        Gebäude:
                                    </Form.Label>
                                    <input style={{width: '300px'}} type="text" id={"userBuilding"}
                                           value={userData?.userBuilding} onChange={onChangeHandlerUserBuilding}
                                           required={true}/>
                                </Col>
                            </Row>
                        </Form.Group>


                        <Form.Group as={Row} className="mb-3" controlId="formPlaintextPassword">
                            <Row>
                                <Col>
                                    <Form.Label column sm="2">
                                        Abteilung:
                                    </Form.Label>
                                    <input style={{width: '300px'}} type="text" id={"userDepartment"}
                                           value={userData?.userDepartment} onChange={onChangeHandlerUserDepartment}
                                           required={true}/>
                                </Col>
                                <Col>
                                    <Form.Label column sm="2">
                                        Raum:
                                    </Form.Label>
                                    <input style={{width: '300px'}} type="text" id={"userRoom"}
                                           value={userData?.userRoom} onChange={onChangeHandlerUserRoom}
                                           required={true}/>
                                </Col>
                            </Row>
                        </Form.Group>


                        <Form.Group as={Row} className="mb-3" controlId="formPlaintextPassword">
                            <Row>
                                <Col>
                                    <Form.Label column sm="2">
                                        Telefon:
                                    </Form.Label>
                                    <input style={{width: '300px'}} type="text" id={"userPhoneNumber"}
                                           value={userData?.userPhoneNumber} onChange={onChangeHandlerUserPhoneNumber}
                                           required={true}/>
                                </Col>
                                <Col>
                                    <Form.Label column sm="2">
                                        E-Mail:
                                    </Form.Label>
                                    <input style={{width: '300px'}} type="text" id={"userEMail"}
                                           value={userData?.userEMail} onChange={onChangeHandlerUserEMail}
                                           required={true}/>
                                </Col>
                            </Row>
                        </Form.Group>


                        <Form.Group as={Row} className="mb-3" controlId="formPlaintextPassword">
                            <Row>
                                <Form.Label column sm="2">
                                    Überschrift:
                                </Form.Label>
                                <input type="text" id={"customerHeadline"} onChange={onChangeHandlerCustomerHeadline}
                                       required={true}/>
                            </Row>
                        </Form.Group>


                        <Form.Group as={Row} className="mb-3" controlId="formPlaintextPassword">
                            <Row>
                                <Form.Label column sm="3">
                                    detaillierte Beschreibung:
                                </Form.Label>
                                <textarea id={"customerDescription"} onChange={onChangeHandlerCustomerDescription}
                                          required={true}/>
                            </Row>
                        </Form.Group>

                        <Button type={"submit"} variant={"success"} onClick={props.onHide}>Ticket erstellen</Button>
                        <Button variant={"warning"} onClick={props.onHide}>Close Modal</Button>

                    </Form>
                </Modal.Body>
            </Modal>
        </div>
    );

}

