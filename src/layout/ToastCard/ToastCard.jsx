import { useEffect, useState } from "react";
import { Toast } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { selectMessage, setMessage } from "../../redux/info";


export default function ToastCard(){

    const dispatch = useDispatch()

    const message = useSelector(selectMessage)

    return (
        <Toast onClose={() => dispatch(setMessage(""))} show={!!message} delay={3000} autohide className="fixed-bottom"  position="bottom-start">
        <Toast.Header>
            <strong className="me-auto">Atomic</strong>
        </Toast.Header>
        <Toast.Body>{message}</Toast.Body>
        </Toast>
    )
}