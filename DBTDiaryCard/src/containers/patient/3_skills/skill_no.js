import React from 'react';
import { makeStyles, withStyles } from '@material-ui/core/styles'
import Button from '@material-ui/core/Button'
import Typography from '@material-ui/core/Typography'
import InputBase from '@material-ui/core/InputBase'
import HeaderView from '../../../components/HeaderView'

const CssTextField = withStyles({
    root: {
        'label + &': {
        },
        marginTop: 20
    },
    input: {
        fontSize: 16, fontWeight: '500', color: 'rgba(0, 0, 0, 0.75)', borderRadius: 0, fontFamily: 'Inter'
    }
})(InputBase)

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1, alignItems: 'center', justifyContent: 'center'
    },
    title: {
        flexGrow: 1,
        fontWeight: '600',
        fontSize: 18,
        color: 'rgba(0, 0, 0, 0.75)'
    },
    contentBox: {
        height: 538,
        top: 70, background: '#E7F8F2', alignItems: 'center', justifyContent: 'center',
        display: 'flex', padding: 40
    },
    content: {
        fontWeight: 'bold',
        fontSize: 40, textAlign: 'center', color: '#38C396'
    },
    buttonsContainer: {
        width: '100%', display: 'flex', flexDirection: 'column', marginTop: 55, marginBottom: 55, alignItems: 'center', justifyContent: 'center'
    },
    buttonContainer: {
        width: 200, height: 50, borderRadius: 25,
        backgroundColor: '#92E7CA'
    },
    buttonText: {
        fontWeight: 'bold', fontSize: 16, color: 'rgba(0, 0, 0, 0.75)'
    },
    backContainer: {
        width: 200, height: 50, borderRadius: 25,
        backgroundColor: 'transparent', marginTop: 10, alignItems: 'center', justifyContent: 'center', display: 'flex'
    },
    backText: {
        fontWeight: 'bold', fontSize: 16, color: '#2F9D7E'
    },
    progressText: {
        color: '#2F9D7E', fontSize: 14, fontWeight: 500, textAlign: 'center'
    },
    contentContainer: {
        margin: 20, marginBottom: 10, display: 'flex', flexDirection: 'column'
    },
    headerContainer: {
        backgroundColor: '#E7F8F2', width: '100%', padding: 16
    },
    inputContainer: {
        backgroundColor: '#F5F5F5', borderRadius: 10, marginLeft: 20, marginRight: 20, marginTop: 24,
        height: 223
    },
    description: {
        fontSize: 12, color: 'rgba(0, 0, 0, 0.5)', fontWeight: '500', width: '100%', textAlign: 'right'
    }
}))

export default function SkillNoView(props) {
    const classes = useStyles();
    const [reason, setReason] = React.useState('')

    const onUpdateReport = () => {
        const {updateReport, onContinue} = props
        if(updateReport){
          updateReport('skill', {skillToday: false, reason: reason})
        }
        if(onContinue){
            onContinue()
          }
      }

    return (
        <div className={classes.root}>
                    <HeaderView
                        title='Skills'
                        currentStep={4}
                        totalStep={6}
                        question='Why didn’t you use any skills?'
                    />
                    <div className={classes.inputContainer}>
                        <div className={classes.contentContainer}>
                            <CssTextField value={reason} onChange={(event) => setReason(event.target.value)} inputProps={{ disableunderline: 'true' }} multiline rows={8} />
                            <Typography className={classes.description}>{`${reason.length} / 300 max characters`}</Typography>
                        </div>
                    </div>
                    <div className={classes.buttonsContainer}>
                        <Button onClick={onUpdateReport} className={classes.buttonContainer}>
                            <Typography className={classes.buttonText}>Next</Typography>
                        </Button>
                        <Button onClick={() => props.onBack && props.onBack()} className={classes.backContainer}>
                            <Typography className={classes.backText}>Back</Typography>
                        </Button>
                    </div>
        </div>
    )
}
  