import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import { useSelector } from "react-redux";
import "../App.css";
import LoginPage from "../modules/Login";
import Home from "../modules/Home";
import Register from "../modules/Register";

export default function Routers() {
    const { token } = useSelector((state) => state.AuthSlice);
    return (
        <div className="App">
            <BrowserRouter>
                <Routes>
                    {!token ? (
                        <Route>
                            <Route path="/" element={<LoginPage />} />
                            <Route path="/signin" element={<Register />} />
                        </Route>
                    ) : (
                        <Route>
                            <Route path="/" element={<Home />} />


                        </Route>
                    )}
                </Routes>
            </BrowserRouter>
        </div>
    );
}