import React, { useEffect, useState } from 'react'
import { styled } from '@mui/material/styles'

import ReactTypingEffect from 'react-typing-effect'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import Grid from '@mui/material/Grid'
import Tooltip from '@mui/material/Tooltip'
import Zoom from '@mui/material/Zoom'

import { convertNepaliDigit } from '../../utils'
import './style.css'

import dhun from '../../music/tihar_dhun.mp3'

import { Countdown } from '../Countdown'

import IconButton from '@mui/material/IconButton'
import PlayCircleOutlineRoundedIcon from '@mui/icons-material/PlayCircleOutlineRounded'
import PauseCircleOutlineRoundedIcon from '@mui/icons-material/PauseCircleOutlineRounded'

import Footer from '../Footer/footer'
import TiharDays from './tiharDates'

import { TiharDates, addHours } from '../../utils'
import Light from './Lights'
import { useAudio } from '../../hooks/useAudio'

const NepaliCountdown = styled(Typography)(({ theme }) => ({
  padding: theme.spacing(1),
  textAlign: 'center',
}))

const datFS = {
  md: '55px',
  sm: '30px',
  xs: '25px',
}

const TiharCountdown = () => {
  const kaagTihar = addHours(TiharDates.start_date)
  let timeLeft = Countdown(kaagTihar)
  let year = new Date().getFullYear()

  const [loading, setLoading] = useState(true)
  const [msgLoading, setMsgLoading] = useState(true)

  const [playing, toggle] = useAudio(dhun)

  useEffect(() => {
    const loadingTimer = setTimeout(() => {
      setLoading(false)
    }, 7000)

    const msgLoadingTimer = setTimeout(() => {
      setMsgLoading(false)
      toggle()
    }, 8000)

    return () => {
      clearTimeout(loadingTimer)
      clearTimeout(msgLoadingTimer)
    }
  }, [])

  const timerComponents = []
  Object.keys(timeLeft).forEach(interval => {
    if (!timeLeft[interval]) {
      return
    }
    timerComponents.push(<span key={interval}>{`${timeLeft[interval]} ${interval} `}</span>)
  })

  return (
    <>
      <Box
        sx={{
          pt: '1%',
          textAlign: 'center',
          overflow: 'hidden',
        }}
      >
        <Light />
      </Box>
      <Box sx={{ flexGrow: 1, pt: '5%', pr: '2%', pl: '2%' }} className="bg-image-tihar">
        <Grid container spacing={2}>
          <Grid item md={1} xs={12}></Grid>
          <Grid
            item
            md={8}
            xs={12}
            sx={{
              textAlign: 'center',
            }}
          >
            <Typography
              component={'div'}
              sx={{
                textAlign: 'center',
                fontSize: '55px',
                fontWeight: 'bold',
                fontStretch: '10px',
                fontFamily: 'Mountains of Christmas',
                textShadow: '0px 0px 8px rgba(255,65,185,1)',
              }}
            >
              <ReactTypingEffect text={['तिहार २०८०', `Tihar ${year}`]} />
            </Typography>
            {loading ? (
              ''
            ) : (
              <>
                {/* <KiteFlying /> */}
                {timerComponents.length ? (
                  <>
                    <Typography
                      sx={{
                        fontSize: '25px',
                      }}
                    >
                      {timerComponents}
                    </Typography>
                    <Box
                      display={'flex'}
                      justifyContent="center"
                      sx={{
                        mt: '2%',
                      }}
                    >
                      <NepaliCountdown fontSize={datFS}>
                        {convertNepaliDigit(timeLeft.days)} दिन
                      </NepaliCountdown>
                      <NepaliCountdown fontSize={datFS}>
                        {convertNepaliDigit(timeLeft.hours)} घण्टा
                      </NepaliCountdown>
                      <NepaliCountdown fontSize={datFS}>
                        {convertNepaliDigit(timeLeft.minutes)} मिनेट
                      </NepaliCountdown>
                      <NepaliCountdown fontSize={datFS}>
                        {convertNepaliDigit(timeLeft.seconds)} सेकेन्ड
                      </NepaliCountdown>
                    </Box>
                  </>
                ) : (
                  <span>Tihar is here!!</span>
                )}
              </>
            )}
            {msgLoading ? (
              ''
            ) : (
              <div className="greeting-msg">
                <div className="play-pause">
                  <Tooltip
                    TransitionComponent={Zoom}
                    open={!playing}
                    arrow
                    enterDelay={3000}
                    title={
                      <Typography fontSize={30} sx={{ backgroundColor: 'secondary' }}>
                        Click me to Play!
                      </Typography>
                    }
                    placement="bottom-end"
                    sx={{
                      fontSize: '20px',
                    }}
                  >
                    <IconButton
                      aria-label="controller"
                      size="large"
                      color="success"
                      sx={{
                        height: '2em',
                        width: '2em',
                        fontSize: '40px',
                      }}
                      onClick={e => {
                        toggle()
                      }}
                    >
                      {playing ? (
                        <PauseCircleOutlineRoundedIcon
                          color="success"
                          sx={{ fontSize: 100, color: 'succces' }}
                        />
                      ) : (
                        <PlayCircleOutlineRoundedIcon
                          color="error"
                          sx={{ fontSize: 100, color: 'danger' }}
                        />
                      )}
                    </IconButton>
                  </Tooltip>
                </div>
                <ReactTypingEffect
                  text={['शुभ दिपावलीको हार्दिक मंङगलमय शुभकामना!!!', `Happy Deepawali!!!`]}
                />
              </div>
            )}
          </Grid>
          <Grid item md={3} xs={12}>
            {loading ? (
              <></>
            ) : (
              <Box
                sx={{
                  pt: '5%',
                }}
              >
                <Typography
                  sx={{
                    fontSize: '20px',
                    textAlign: 'center',
                  }}
                >
                  Important Dates
                </Typography>
                <TiharDays />
              </Box>
            )}
          </Grid>
        </Grid>
        <Footer />
      </Box>
    </>
  )
}

export default TiharCountdown
