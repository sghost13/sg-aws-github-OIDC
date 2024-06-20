import * as cdk from 'aws-cdk-lib';
import { Role, FederatedPrincipal, ManagedPolicy, PolicyStatement, Effect, PolicyDocument } from 'aws-cdk-lib/aws-iam';
import { Construct } from 'constructs';

export class GithubActionsRoleStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    // Create the OIDC provider for GitHub
    const oidcProvider = new cdk.aws_iam.OpenIdConnectProvider(this, 'GithubOIDCProvider', {
      url: 'https://token.actions.githubusercontent.com',
      clientIds: ['sts.amazonaws.com']
    });

    // Create the role
    const role = new Role(this, 'GithubActionsRole', {
      assumedBy: new FederatedPrincipal(oidcProvider.openIdConnectProviderArn, {
        StringLike: {
          'token.actions.githubusercontent.com:aud': 'sts.amazonaws.com',
          'token.actions.githubusercontent.com:sub': [
//              'repo:sghost13/sg-aws-github-oidc:ref:refs/heads/main'
            'repo:sghost13/sg-aws-github-oidc:*/main'
          ]
        },
      },
      'sts:AssumeRoleWithWebIdentity'
    ),
      description: 'Role for Github Actions to deploy using CDK', // Description for the role
      roleName: 'GitHubActions', // Custom name for the role
    });

    // Additional managed policies (optional)
    role.addManagedPolicy(ManagedPolicy.fromAwsManagedPolicyName('AdministratorAccess'));
  }
}




