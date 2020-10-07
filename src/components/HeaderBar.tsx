import React, { FunctionComponent } from 'react'
import { Appbar } from 'react-native-paper'

type Props = {
  title: string
  goBack?: () => void
}

const HeaderBar: FunctionComponent<Props> = ({ title, goBack }) => {
  return (
    <Appbar.Header style={{ backgroundColor: '#01b4e4' }} dark>
      {goBack && <Appbar.BackAction onPress={goBack} />}
      <Appbar.Content title={title} />
    </Appbar.Header>
  )
}

export default HeaderBar
