/* eslint-disable jsx-a11y/img-redundant-alt */
import React from 'react';
import styles from '../../components/design/FixedRatio.less';
import Buttons from './Buttons'

export default class CarouselCard extends React.Component {
    render() {
        const { image_url, subtitle, buttons } = this.props;
        return <div style={{ backgroundColor: "#1d2733", padding: "50px 50px 10px 5px", borderRadius: "10px", width: "400px" }}>
            <div style={{ heigth: "250px", backgroundColor: "#404b5b", borderRadius: "10px", padding: "5px", color: "white" }}>
                <p style={{ color: "#9688f6" }}>Sender</p>
            </div>
            <div className={styles.aspectRatioBox} style={{ borderRadius: "10px 10px 0px 0px", height: "250px", "margin-bottom": "0px" }}>
                <img className={styles.aspectRatioBoxInside}
                    style={{ height: "250px" }}
                    alt="Please insert an image"
                    src={image_url}
                />
            </div>
            <div className={styles.aspectRatioBox} style={{ borderRadius: "0px", height: "100px", backgroundColor: "#008ec8", "margin-bottom": "0px" }}>
                <p style={{ "overflow-wrap": "break-word" }}><font color="#ffffff">{subtitle}</font></p>
            </div>
            <div className={styles.aspectRatioBox} style={{ borderRadius: "0px", height: "50px", backgroundColor: "#008ec8", "margin-bottom": "0px" }}>
                <Buttons titles={buttons.map(obj => obj.title).filter(obj => obj)} style={{ width: '100%', marginTop: '10px', height: '40%', minHeight: '15px' }} />
            </div>
        </div>
    }
}
