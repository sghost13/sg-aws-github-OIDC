#!/usr/bin/env node
import 'source-map-support/register';
import * as cdk from 'aws-cdk-lib';
import {GithubActionsRoleStack} from '../lib/github-deploy-role';

const app = new cdk.App();
new GithubActionsRoleStack(app, 'IamRoleStack', {

});
