import React, { useContext, FC, useEffect } from 'react';
import { GridColumn, Grid } from 'semantic-ui-react';
import ActivityStore from '../../../app/stores/activityStore'
import { observer } from 'mobx-react-lite';
import { RouteComponentProps } from 'react-router-dom';
import LoadingComponent from "../../../app/layout/LoadingComponent";
import ActivityDetailedHeader from './ActivityDetailedHeader';
import ActivityDetailedInfo from './ActivityDetailedInfo';
import ActivityDetailedChat from './ActivityDetailedChat'
import ActivityDetailedSideBar from './ActivityDetailedChat'
import { RootStoreContext } from '../../../app/stores/rootStore';

interface DetailParams {
    id: string
}


const ActivityDetails: FC<RouteComponentProps<DetailParams>> = ({match, history}) => {
    const rootStore = useContext(RootStoreContext)
    const {activity, loadingInitial, loadActivity} = rootStore.activityStore

    useEffect(() => {
        loadActivity(match.params.id)
        // .catch(() => {
        // history.push('/notfound')

    }, [loadActivity, match.params.id, history]);

    if (loadingInitial) return <LoadingComponent content={("still loading activity")}/>
    if (!activity) {
        return <h1>No Activity Found</h1>
    }
    return (
        <Grid>
            <GridColumn width={10}>
                <ActivityDetailedHeader activity={activity}/>
                <ActivityDetailedInfo activity={activity}/>
                < ActivityDetailedChat/>
            </GridColumn>
            <GridColumn width={6}>
                <ActivityDetailedSideBar/>
            </GridColumn>
        </Grid>
    );
};

export default observer(ActivityDetails);
