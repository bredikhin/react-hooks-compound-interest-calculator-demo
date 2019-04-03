import React, { memo, useState, useEffect } from 'react'
import { withStyles, WithStyles, createStyles, Theme } from '@material-ui/core/styles'
import Grid from '@material-ui/core/Grid'
import InputAdornment from '@material-ui/core/InputAdornment'
import TextField from '@material-ui/core/TextField'
import Typography from '@material-ui/core/Typography'
import Dinero from 'dinero.js'

interface InputData {
  principal: number,
  interest: number,
  annualAddition: number,
  timesPerYear: number,
  numberOfYears: number
}

const defaults: InputData = {
  principal: 1000,
  interest: 12,
  annualAddition: 100,
  timesPerYear: 1,
  numberOfYears: 10
}

const compound = ({
  principal,
  interest,
  annualAddition,
  timesPerYear,
  numberOfYears
}: InputData): number => {
  const k = 1 + interest / 100 / timesPerYear

  return principal * Math.pow(k, numberOfYears) +
    annualAddition * (Math.pow(k, numberOfYears + 1) - k)/(k - 1)
}

const styles = (theme: Theme) => createStyles({
  root: {
    minHeight: '100%',
    display: 'flex',
    flexDirection: 'column',
    flexWrap: 'wrap',
    padding: '2em'
  },
  header: {
    textTransform: 'uppercase'
  },
  field: {
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    flexBasis: 100
  },
  result: {
    fontSize: '10vw'
  }
})

interface Props extends WithStyles<typeof styles> {
  title: String
}

const Calculator = ( { title, classes }: Props ) => {
  const [principal, setPrincipal] = useState('')
  const [interest, setInterest] = useState('')
  const [annualAddition, setAnnualAddition] = useState('')
  const [timesPerYear, setTimesPerYear] = useState('')
  const [numberOfYears, setNumberOfYears] = useState('')
  const [futureAmount, setFutureAmount] = useState('')

  useEffect(() => {
    setFutureAmount(compound({
      principal: parseFloat(principal),
      interest: parseFloat(interest),
      annualAddition: parseFloat(annualAddition),
      timesPerYear: parseInt(timesPerYear),
      numberOfYears: parseInt(numberOfYears)
    }).toString() || '')
  })

  return (
    <Grid container direction="column" className={classes.root}>
      <Grid item className={classes.field}>
        {title && <header>
          <Typography variant="subtitle1" className={classes.header}>
            {title}
          </Typography>
        </header>}
      </Grid>
      <Grid item className={classes.field}>
        <TextField
          label="Principal"
          id="principal"
          InputProps={{
            startAdornment: <InputAdornment position="start">$</InputAdornment>,
          }}
          value={principal}
          onChange={(e) => setPrincipal(e.target.value)}
        />
      </Grid>
      <Grid item className={classes.field}>
        <TextField
          label="Interest"
          id="interest"
          className={classes.field}
          InputProps={{
            startAdornment: <InputAdornment position="start">%</InputAdornment>,
          }}
          value={interest}
          onChange={(e) => setInterest(e.target.value)}
        />
      </Grid>
      <Grid item className={classes.field}>
        <TextField
          label="Annual addition"
          id="annual-addition"
          className={classes.field}
          InputProps={{
            startAdornment: <InputAdornment position="start">$</InputAdornment>,
          }}
          value={annualAddition}
          onChange={(e) => setAnnualAddition(e.target.value)}
        />
      </Grid>
      <Grid item className={classes.field}>
        <TextField
          label="Times  per year"
          id="times-per-year"
          className={classes.field}
          value={timesPerYear}
          onChange={(e) => setTimesPerYear(e.target.value)}
        />
      </Grid>
      <Grid item className={classes.field}>
        <TextField
          label="Number of years"
          id="number-of-years"
          className={classes.field}
          value={numberOfYears}
          onChange={(e) => setNumberOfYears(e.target.value)}
        />
      </Grid>
      <Grid item className={classes.field}>
        <Typography variant="h1" className={classes.result}>
          {Dinero({ amount: Math.round((parseFloat(futureAmount) || 0) * 100)}).toFormat('$0,0.00')}
        </Typography>
      </Grid>
    </Grid>
  )
}

export default withStyles(styles)(memo(Calculator))