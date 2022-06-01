import React from 'react'
import { Icon, Card } from 'antd'
import styles from './NumberCard.less'

const NumberCard  = (props) => {
  const { icon, color, title, number, onClick } = props
  return (
    <Card className={styles.numberCard} bordered={false} bodyStyle={{padding: 0}}>
      <Icon className={styles.iconWarp} style={{ color }} type={icon} />
      <div className={styles.content} onClick={onClick}>
        <p className={styles.title}>{title || 'No Title'}</p>
        <p className={styles.number}>
          {number}
        </p>
      </div>
    </Card>
  )
}

export default NumberCard
