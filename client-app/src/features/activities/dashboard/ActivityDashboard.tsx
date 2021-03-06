import React, {useContext, useEffect} from 'react';
import {Grid} from 'semantic-ui-react';
import ActivityList from './ActivityList';
import {observer} from 'mobx-react-lite';
import ActivityStore from "../../../app/stores/activityStore";
import LoadingComponent from "../../../app/layout/LoadingComponent";
import { RootStoreContext } from '../../../app/stores/rootStore';


const ActivityDashboard: React.FC = () => {
    const rootStore = useContext(RootStoreContext)
    const{loadActivities, loadingInitial} = rootStore.activityStore;
    useEffect(() => {
        loadActivities()
    }, [loadActivities])

    if (rootStore.activityStore.loadingInitial) return <LoadingComponent content={("still loading")}/>
    return (
        <Grid>
            <Grid.Column width={10}>
                <ActivityList/>
            </Grid.Column>
            <Grid.Column width={6}>
                <h1>Activity Filters</h1>
            </Grid.Column>
        </Grid>
    );
};

export default observer(ActivityDashboard);
