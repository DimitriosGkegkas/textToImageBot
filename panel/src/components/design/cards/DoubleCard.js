import React from 'react'
import { Icon, Card } from 'antd'
import styles from './DoubleCard.less'

const DoubleCard  = (props) => {
  const { items } = props
  return (
    <Card className={styles.doubleCard} bordered={false} bodyStyle={{padding: 0}}>
      {items.map((item, i) => {
        const { icon, color, title, number, size } = item;
        return(
          <div key={i}>
            <Icon styles={{fontSize: size}} className={styles.iconWarp} style={{ color }} type={icon}/>
            <div className={styles.content}>
              <p className={styles.title}>{title}</p>
              <p className={styles.number}>
                {number}
              </p>
            </div>
          </div>
        )
      })}
    </Card>
  )
}

export default DoubleCard;
