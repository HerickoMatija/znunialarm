import { RemovalPolicy } from 'aws-cdk-lib'
import * as awsBackup from 'aws-cdk-lib/aws-backup'
import * as awsDynamodb from 'aws-cdk-lib/aws-dynamodb'
import { Construct } from 'constructs'
import { stageNameContext } from '../../cdk.context'

type BaseTableProps = {
  environment: {
    appName: string
    stage: stageNameContext
  }
}

export function createCategoryTable(scope: Construct, props: BaseTableProps): awsDynamodb.Table {
  const categoryTable = new awsDynamodb.Table(
    scope,
    `${props.environment.appName}_${props.environment.stage}_categoryTable`,
    {
      tableName: `${props.environment.appName}_${props.environment.stage}_categoryTable`,
      removalPolicy: props.environment.stage === 'prod' ? RemovalPolicy.RETAIN : RemovalPolicy.DESTROY,
      billingMode: awsDynamodb.BillingMode.PAY_PER_REQUEST,
      pointInTimeRecovery: true,
      partitionKey: { name: 'id', type: awsDynamodb.AttributeType.STRING },
    }
  )

  categoryTable.addGlobalSecondaryIndex({
    indexName: 'categoriesByOwner',
    partitionKey: { name: 'owner', type: awsDynamodb.AttributeType.STRING },
    sortKey: { name: 'name', type: awsDynamodb.AttributeType.STRING },
  })

  categoryTable.addGlobalSecondaryIndex({
    indexName: 'categoriesBySharedId',
    partitionKey: {
      name: 'sharedId',
      type: awsDynamodb.AttributeType.STRING,
    },
  })

  return categoryTable
}

export function createMealTable(scope: Construct, props: BaseTableProps): awsDynamodb.Table {
  const mealTable = new awsDynamodb.Table(scope, `${props.environment.appName}_${props.environment.stage}_mealTable`, {
    tableName: `${props.environment.appName}_${props.environment.stage}_mealTable`,
    removalPolicy: props.environment.stage === 'prod' ? RemovalPolicy.RETAIN : RemovalPolicy.DESTROY,
    billingMode: awsDynamodb.BillingMode.PAY_PER_REQUEST,
    pointInTimeRecovery: true,
    partitionKey: { name: 'id', type: awsDynamodb.AttributeType.STRING },
  })

  mealTable.addGlobalSecondaryIndex({
    indexName: 'mealsByOwner',
    partitionKey: { name: 'owner', type: awsDynamodb.AttributeType.STRING },
    sortKey: { name: 'name', type: awsDynamodb.AttributeType.STRING },
  })

  mealTable.addGlobalSecondaryIndex({
    indexName: 'mealsByCategory',
    partitionKey: {
      name: 'categoryId',
      type: awsDynamodb.AttributeType.STRING,
    },
  })

  mealTable.addGlobalSecondaryIndex({
    indexName: 'mealsBySharedId',
    partitionKey: {
      name: 'sharedId',
      type: awsDynamodb.AttributeType.STRING,
    },
  })

  return mealTable
}

export function createNotificationTable(scope: Construct, props: BaseTableProps): awsDynamodb.Table {
  const notificationTable = new awsDynamodb.Table(
    scope,
    `${props.environment.appName}_${props.environment.stage}_notificationTable`,
    {
      tableName: `${props.environment.appName}_${props.environment.stage}_notificationTable`,
      removalPolicy: props.environment.stage === 'prod' ? RemovalPolicy.RETAIN : RemovalPolicy.DESTROY,
      billingMode: awsDynamodb.BillingMode.PAY_PER_REQUEST,
      pointInTimeRecovery: true,
      partitionKey: { name: 'id', type: awsDynamodb.AttributeType.STRING },
    }
  )

  notificationTable.addGlobalSecondaryIndex({
    indexName: 'notificationsByOwner',
    partitionKey: { name: 'owner', type: awsDynamodb.AttributeType.STRING },
    sortKey: { name: 'name', type: awsDynamodb.AttributeType.STRING },
  })

  return notificationTable
}

export function createPermissionTable(scope: Construct, props: BaseTableProps): awsDynamodb.Table {
  const permissionTable = new awsDynamodb.Table(
    scope,
    `${props.environment.appName}_${props.environment.stage}_permissionTable`,
    {
      tableName: `${props.environment.appName}_${props.environment.stage}_permissionTable`,
      removalPolicy: props.environment.stage === 'prod' ? RemovalPolicy.RETAIN : RemovalPolicy.DESTROY,
      billingMode: awsDynamodb.BillingMode.PAY_PER_REQUEST,
      pointInTimeRecovery: true,
      partitionKey: { name: 'id', type: awsDynamodb.AttributeType.STRING },
    }
  )

  permissionTable.addGlobalSecondaryIndex({
    indexName: 'permissionsByOwner',
    partitionKey: { name: 'owner', type: awsDynamodb.AttributeType.STRING },
  })

  permissionTable.addGlobalSecondaryIndex({
    indexName: 'permissionsByCategory',
    partitionKey: {
      name: 'categoryId',
      type: awsDynamodb.AttributeType.STRING,
    },
  })
  permissionTable.addGlobalSecondaryIndex({
    indexName: 'permissionsByTarget',
    partitionKey: { name: 'targetSub', type: awsDynamodb.AttributeType.STRING },
  })

  return permissionTable
}

export function createFeedbackTable(scope: Construct, props: BaseTableProps): awsDynamodb.Table {
  const feedbackTable = new awsDynamodb.Table(
    scope,
    `${props.environment.appName}_${props.environment.stage}_feedbackTable`,
    {
      tableName: `${props.environment.appName}_${props.environment.stage}_feedbackTable`,
      removalPolicy: props.environment.stage === 'prod' ? RemovalPolicy.RETAIN : RemovalPolicy.DESTROY,
      billingMode: awsDynamodb.BillingMode.PAY_PER_REQUEST,
      pointInTimeRecovery: true,
      partitionKey: { name: 'id', type: awsDynamodb.AttributeType.STRING },
    }
  )

  return feedbackTable
}

export function createLandingTable(scope: Construct, props: BaseTableProps): awsDynamodb.Table {
  const landingTable = new awsDynamodb.Table(
    scope,
    `${props.environment.appName}_${props.environment.stage}_landingTable`,
    {
      tableName: `${props.environment.appName}_${props.environment.stage}_landingTable`,
      removalPolicy: props.environment.stage === 'prod' ? RemovalPolicy.RETAIN : RemovalPolicy.DESTROY,
      billingMode: awsDynamodb.BillingMode.PAY_PER_REQUEST,
      pointInTimeRecovery: true,
      partitionKey: { name: 'id', type: awsDynamodb.AttributeType.STRING },
    }
  )

  return landingTable
}

export function createYumAlarmTable(scope: Construct, props: BaseTableProps): awsDynamodb.Table {
  const yumalarmTable = new awsDynamodb.Table(
    scope,
    `${props.environment.appName}_${props.environment.stage}_yumalarmTable`,
    {
      tableName: `${props.environment.appName}_${props.environment.stage}_yumalarmTable`,
      removalPolicy: props.environment.stage === 'prod' ? RemovalPolicy.RETAIN : RemovalPolicy.DESTROY,
      billingMode: awsDynamodb.BillingMode.PAY_PER_REQUEST,
      pointInTimeRecovery: true,
      partitionKey: { name: 'PK', type: awsDynamodb.AttributeType.STRING },
      sortKey: { name: 'SK', type: awsDynamodb.AttributeType.STRING },
    }
  )

  yumalarmTable.addGlobalSecondaryIndex({
    indexName: 'GSI1',
    partitionKey: { name: 'GSI1', type: awsDynamodb.AttributeType.STRING },
    sortKey: { name: 'SK', type: awsDynamodb.AttributeType.STRING },
  })

  return yumalarmTable
}

export function createRecipesTable(scope: Construct, props: BaseTableProps): awsDynamodb.Table {
  const recipeTable = new awsDynamodb.Table(
    scope,
    `${props.environment.appName}_${props.environment.stage}_recipeTable`,
    {
      tableName: `${props.environment.appName}_${props.environment.stage}_recipeTable`,
      removalPolicy: props.environment.stage === 'prod' ? RemovalPolicy.RETAIN : RemovalPolicy.DESTROY,
      billingMode: awsDynamodb.BillingMode.PAY_PER_REQUEST,
      pointInTimeRecovery: true,
      partitionKey: { name: 'PK', type: awsDynamodb.AttributeType.STRING },
      sortKey: { name: 'SK', type: awsDynamodb.AttributeType.STRING },
    }
  )

  recipeTable.addGlobalSecondaryIndex({
    indexName: 'GSI1',
    partitionKey: { name: 'GSI1', type: awsDynamodb.AttributeType.STRING },
    sortKey: { name: 'SK', type: awsDynamodb.AttributeType.STRING },
  })

  return recipeTable
}

export function createBackupRule(scope: Construct, props: BaseTableProps, tables: Array<awsDynamodb.Table>) {
  if (props.environment.stage !== 'prod') {
    return
  }

  const backupVault = new awsBackup.BackupVault(
    scope,
    `${props.environment.appName}_${props.environment.stage}_backupVault`,
    {
      backupVaultName: `${props.environment.appName}_${props.environment.stage}_backupVault`,
    }
  )

  const plan = new awsBackup.BackupPlan(scope, `${props.environment.appName}_${props.environment.stage}_backupPlan`)
  plan.addRule(awsBackup.BackupPlanRule.daily(backupVault))
  plan.addSelection(`${props.environment.appName}_${props.environment.stage}_backupSelection`, {
    resources: tables.map((table) => awsBackup.BackupResource.fromDynamoDbTable(table)),
  })
}
