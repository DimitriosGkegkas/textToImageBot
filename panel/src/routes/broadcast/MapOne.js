import { Row, Col } from 'antd';
import React, { Component } from 'react';
import greekCountry from './greekCounty.js'


export class Map extends Component {

    constructor(props) {
        super(props);
        this.state = {
            selected: ""
        }
    }

    onClickHandler(key) {
        return () => {
            this.state.selected = key
            this.setState(this.state)
            this.props.onChange(this.state.selected)
        }
    }


    render() {
        const mes = {


            "background-size": "contain"
        }
        const open = {
            ...mes,
            "backgroundColor": "rgb(128, 193, 123)",
            "backgroundBlendMode": "color-burn"
        }
        const columnes = []
        greekCountry.slice(0, -3).forEach(element => {
            columnes.push(
                <div
                    onClick={this.onClickHandler(element.id)}
                    style={{
                        background: "url(" + element.BgMedia + ")",
                        float: element.id === "7" ? 'right' : "left",
                        width: 40 * element.width + "px", height: 40 * element.height + "px",
                        ...(this.state.selected === element.id ? open : mes)
                    }} />
            )
        });
        columnes.push(
            <div style={{
                width: "80px",
                height: "80px",
                float: "left",
            }}>
                <div
                    onClick={this.onClickHandler(greekCountry.slice(-3)[0].id)}
                    style={{
                        background: "url(" + greekCountry.slice(-3)[0].BgMedia + ")",
                        float: greekCountry.slice(-3)[0].id === "7" ? 'right' : "left",
                        width: 40 * greekCountry.slice(-3)[0].width + "px", height: 40 * greekCountry.slice(-3)[0].height + "px",
                        ...(this.state.selected === (greekCountry.slice(-3)[0].id) ? open : mes)
                    }} />
                <div
                    onClick={this.onClickHandler(greekCountry.slice(-1)[0].id)}
                    style={{
                        background: "url(" + greekCountry.slice(-1)[0].BgMedia + ")",
                        float: greekCountry.slice(-1)[0].id === "7" ? 'right' : "left",
                        width: 40 * greekCountry.slice(-1)[0].width + "px", height: 40 * greekCountry.slice(-1)[0].height + "px",
                        ...(this.state.selected === (greekCountry.slice(-1)[0].id) ? open : mes)
                    }} />
            </div >

        )
        columnes.push(

            <div
                onClick={this.onClickHandler(greekCountry.slice(-2)[0].id)}
                style={{
                    background: "url(" + greekCountry.slice(-2)[0].BgMedia + ")",
                    float: greekCountry.slice(-2)[0].id === "7" ? 'right' : "left",
                    width: 40 * greekCountry.slice(-2)[0].width + "px", height: 40 * greekCountry.slice(-2)[0].height + "px",
                    ...(this.state.selected === (greekCountry.slice(-2)[0].id) ? open : mes)
                }} />

        )
        return <div style={{ width: "200px" }}>
            {columnes}

        </div >
    }
}

