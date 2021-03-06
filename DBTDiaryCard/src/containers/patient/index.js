import React, { useState, useEffect } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import Typography from '@material-ui/core/Typography'
import IconButton from '@material-ui/core/IconButton'
import Button from '@material-ui/core/Button'
import ArrowBack from '@material-ui/icons/ArrowBack'
import { connect } from 'react-redux'
import TargetView from './1_target'
import EmotionView from './2_fellings'
import SkillsView from './3_skills'
import SkillNoView from './3_skills/skill_no'
import SkillYesView from './3_skills/skill_yes'
import EffortView from './5_effort'
import NoteView from './7_notes'
import SkillHelpView from './6_skillhelp'
import { useTranslation } from "react-i18next"

import actions from '../home/action'

const { updateReport, createReport } = actions

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1, alignItems: 'center', justifyContent: 'center'
    },
    menuButton: {
        color: 'rgba(0, 0, 0, 0.5)', marginLeft: 20
    },
    headerContainer: {
        backgroundColor: 'white', width: '100%', height: 64, display: 'flex', alignItems: 'center', justifyContent: 'center'
    },
    headerIcon: {
        marginLeft: 20
    },
    headerTitle: {
        fontSize: 18, color: 'rgba(0, 0, 0, 0.75)', flex: 1, fontWeight: '600', textAlign: 'center', marginRight: 54
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
        display: 'flex', width: '100%'
    },
    content: {
        fontWeight: 'bold',
        fontSize: 40, textAlign: 'center', color: '#38C396', marginLeft: 45, marginRight: 45
    },
    buttonContainer: {
        width: 200, height: 50, borderRadius: 25,
        backgroundColor: '#92E7CA', marginTop: 55
    },
    buttonText: {
        fontWeight: 'bold', fontSize: 16, color: 'rgba(0, 0, 0, 0.75)'
    },
    buttonsContainer: {
        width: '100%', display: 'flex', flexDirection: 'column', marginTop: 55, marginBottom: 55, alignItems: 'center', justifyContent: 'center'
    },
}))

function HomeView(props) {
    const classes = useStyles()
    const [active, setActive] = useState(0)
    const [settings, setSettings] = useState(null)
    const [time, setTime] = useState(null)
    const { t, i18n } = useTranslation();

    useEffect(() => {
        const eventMethod = window.addEventListener ? "addEventListener" : "attachEvent"
        const eventer = window[eventMethod]
        const messageEvent = eventMethod === "attachEvent" ? "onmessage" : "message"

        eventer(
            messageEvent, (e) => {
                const settings = e.data.settings;
                const configuration = e.data.configuration;
                setSettings(settings);
                i18n.changeLanguage(!!configuration ? configuration.language : "en_US");
                setTime(new Date().getTime());
            },
            false
        )
    }, [])

    useEffect(() => {
        if (active === 8) {
            let finalReport = createReport(props.report)
            finalReport.duration = new Date().getTime() - time
            console.log(finalReport)
            window.parent.postMessage(JSON.stringify(finalReport), "*");
        }
    }, [active])

    if (active === 0) {
        return (

            <div className={classes.root}>
                <div className={classes.headerContainer}>
                    <Typography className={classes.headerTitle}>{t("LIFE_WORTH_LIVING_GOAL")}</Typography>
                </div>
                <div className={classes.contentBox}>
                    <Typography className={classes.content}>{settings?.livingGoal ?? ""}</Typography>
                </div>
                <div className={classes.buttonsContainer}>
                    <Button onClick={() => setActive(1)} className={classes.buttonContainer}>
                        <Typography className={classes.buttonText}>{t("CONTINUE")}</Typography>
                    </Button>
                </div>
            </div>
        )
    } else if (active === 1) {
        return (<TargetView settings={settings} {...props} onContinue={() => setActive(2)} onBack={() => setActive(0)} />)
    } else if (active === 2) {
        return (<EmotionView settings={settings} {...props} onContinue={() => setActive(3)} onBack={() => setActive(1)} />)
    } else if (active === 3) {
        return (<SkillsView {...props} onContinue={(mode) => setActive(mode)} onBack={() => setActive(2)} />)
    } else if (active === 4) {
        return (<SkillYesView {...props} onContinue={() => setActive(5)} onBack={() => setActive(3)} />)
    } else if (active === 41) {
        return (<SkillYesView {...props} onContinue={() => setActive(5)} onBack={() => setActive(3)} />)
    } else if (active === 42) {
        return (<SkillNoView {...props} onContinue={() => setActive(7)} onBack={() => setActive(3)} />)
    } else if (active === 5) {
        return (<EffortView {...props} onContinue={() => setActive(6)} onBack={() => setActive(41)} />)
    } else if (active === 6) {
        return (<SkillHelpView {...props} onContinue={() => setActive(7)} onBack={() => setActive(5)} />)
    } else if (active === 7) {
        return (<NoteView {...props} onContinue={() => setActive(8)} onBack={() => setActive(props.report && props.report.skillToday ? 6 : 42)} />)
    } else if (active == 8) {
        return null
    }
}

export default connect((state) => ({
    report: state.appReducer.report,
    config: state.appReducer.config
}), {
    updateReport
})(HomeView)