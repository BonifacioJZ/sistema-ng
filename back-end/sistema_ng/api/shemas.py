import graphene 
from .types import Query as SchemaQuery
from .mutations import Mutation as MutationQuery
import graphql_jwt
class Query(SchemaQuery,graphene.ObjectType):
    pass
class Mutation(MutationQuery, graphene.ObjectType):
    token_auth = graphql_jwt.token_auth = graphql_jwt.ObtainJSONWebToken.Field()
    verify_token = graphql_jwt.Verify.Field()
    refresh_token = graphql_jwt.Refresh.Field()
    
schema = graphene.Schema(query=Query,mutation=Mutation)

