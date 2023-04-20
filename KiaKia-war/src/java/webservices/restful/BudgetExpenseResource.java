/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package webservices.restful;

import entity.Budget;
import entity.BudgetExpenseCategory;
import entity.Debt;
import entity.Expense;
import error.BudgetNotFoundException;
import error.CategoryNotFoundException;
import error.ExpenseNotFoundException;
import error.TripNotFoundException;
import error.UnableToSetBudgetException;
import error.UserNotFoundException;
import java.math.BigDecimal;
import java.util.List;
import java.util.Map;
import javax.ejb.EJB;
import javax.json.Json;
import javax.json.JsonObject;
import javax.ws.rs.Consumes;
import javax.ws.rs.DELETE;
import javax.ws.rs.GET;
import javax.ws.rs.POST;
import javax.ws.rs.PUT;
import javax.ws.rs.Path;
import javax.ws.rs.PathParam;
import javax.ws.rs.Produces;
import javax.ws.rs.QueryParam;
import javax.ws.rs.core.GenericEntity;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;
import session.BudgetSessionBeanLocal;
import session.DebtSessionBeanLocal;
import session.ExpenseSessionBeanLocal;

/**
 * REST Web Service
 *
 * @author MK
 */
@Path("budgetExpense/")
public class BudgetExpenseResource 
{
    @EJB
    DebtSessionBeanLocal debtSessionBeanLocal;

    @EJB
    BudgetSessionBeanLocal budgetSessionBeanLocal;
    
    @EJB
    ExpenseSessionBeanLocal expenseSessionBeanLocal;
    
    @POST
    @Path("{tripId}/budget/{categoryId}")
    @Consumes(MediaType.APPLICATION_JSON)
    @Produces(MediaType.APPLICATION_JSON)
    public Response setBudget(@PathParam("tripId") Long tripId, Long amt, @PathParam("categoryId") Long categoryId) 
    {
        try 
        {
            Budget newB = new Budget(new BigDecimal(amt), false);
            budgetSessionBeanLocal.setBudget(tripId, newB, categoryId);
            return Response.status(204).build();
        } 
        catch (TripNotFoundException | CategoryNotFoundException ex) 
        {
            JsonObject exception = Json.createObjectBuilder()
                    .add("error", ex.getMessage())
                    .build();
            return Response.status(404).entity(exception).build();
        } 
        catch (UnableToSetBudgetException ex) 
        {
            JsonObject exception = Json.createObjectBuilder()
                    .add("error", ex.getMessage())
                    .build();
            return Response.status(400).entity(exception).build();
        }
    }

    @PUT
    @Path("updateBudget/{budgetId}")
    @Consumes(MediaType.APPLICATION_JSON)
    @Produces(MediaType.APPLICATION_JSON)
    public Response updateBudget( @PathParam("budgetId") Long budgetId, @QueryParam("budgetAmt") Long budgetAmt) 
    {
        try 
        {
            budgetSessionBeanLocal.updateBudget(budgetId, budgetAmt);
            return Response.status(204).build();
        } 
        catch (BudgetNotFoundException ex) 
        {
            JsonObject exception = Json.createObjectBuilder()
                    .add("error", ex.getMessage())
                    .build();
            return Response.status(400).entity(exception).build();
        }
    }

    @DELETE
    @Path("{tripId}/deleteBudget/{categoryId}")
    @Produces(MediaType.APPLICATION_JSON)
    public Response deleteBudget(@PathParam("tripId") Long tripId, @PathParam("categoryId") Long categoryId) 
    {
        try 
        {
            budgetSessionBeanLocal.deleteBudget(categoryId, tripId);
            return Response.status(204).build();
        } 
        catch (BudgetNotFoundException | TripNotFoundException | CategoryNotFoundException ex) 
        {
            JsonObject exception = Json.createObjectBuilder()
                    .add("error", ex.getMessage())
                    .build();
            return Response.status(404).entity(exception).build();
        }
    }

    @GET
    @Path("budget/category/{categoryId}")
    @Produces(MediaType.APPLICATION_JSON)
    public Response getBudgetByCategory(@PathParam("categoryId") Long categoryId) 
    {
        try 
        {
            Map<Long, BigDecimal> budget = budgetSessionBeanLocal.getBudgetByCategory(categoryId);
            return Response.status(200).entity(budget).build();
        } 
        catch (BudgetNotFoundException | CategoryNotFoundException ex) 
        {
            JsonObject exception = Json.createObjectBuilder()
                    .add("error", ex.getMessage())
                    .build();
            return Response.status(404).entity(exception).build();
        }
    }
    
    @GET
    @Path("{tripId}/availableCategories")
    @Produces(MediaType.APPLICATION_JSON)
    public Response getAvailableBudgetCategory(@PathParam("tripId") Long tripId) 
    {
        try 
        {
            List<BudgetExpenseCategory> availableCategories = budgetSessionBeanLocal.getAvailableBudgetCategory(tripId);
            return Response.status(200).entity(availableCategories).build();
        } 
        catch (TripNotFoundException ex) 
        {
            JsonObject exception = Json.createObjectBuilder()
                    .add("error", ex.getMessage())
                    .build();
            return Response.status(404).entity(exception).build();
        } 
        catch (IllegalArgumentException ex) 
        {
            JsonObject exception = Json.createObjectBuilder()
                    .add("error", ex.getMessage())
                    .build();
            return Response.status(400).entity(exception).build();
        }
    }
    
    @GET
    @Path("{tripId}/associatedCategories")
    @Produces(MediaType.APPLICATION_JSON)
    public Response getAssociatedCategory(@PathParam("tripId") Long tripId) 
    {
        try 
        {
            List<BudgetExpenseCategory> availableCategories = budgetSessionBeanLocal.getAssociatedCategory(tripId);
            return Response.status(200).entity(availableCategories).build();
        } 
        catch (TripNotFoundException ex) 
        {
            JsonObject exception = Json.createObjectBuilder()
                    .add("error", ex.getMessage())
                    .build();
            return Response.status(404).entity(exception).build();
        } 
        catch (IllegalArgumentException ex) 
        {
            JsonObject exception = Json.createObjectBuilder()
                    .add("error", ex.getMessage())
                    .build();
            return Response.status(400).entity(exception).build();
        }
    }
    
    @GET
    @Path("{tripId}/allCategories")
    @Produces(MediaType.APPLICATION_JSON)
    public Response getAllCategories(@PathParam("tripId") Long tripId) 
    {
        try 
        {
            List<BudgetExpenseCategory> allCategories = budgetSessionBeanLocal.getAllCategories(tripId);
            return Response.status(200).entity(allCategories).build();
        } 
        catch (TripNotFoundException ex) 
        {
            JsonObject exception = Json.createObjectBuilder()
                    .add("error", ex.getMessage())
                    .build();
            return Response.status(404).entity(exception).build();
        } 
        catch (IllegalArgumentException ex) 
        {
            JsonObject exception = Json.createObjectBuilder()
                    .add("error", ex.getMessage())
                    .build();
            return Response.status(400).entity(exception).build();
        }
    }

    @GET
    @Path("{tripId}/totalBudget")
    @Produces(MediaType.APPLICATION_JSON)
    public Response getTotalBudget(@PathParam("tripId") Long tripId) 
    {
        try 
        {
            BigDecimal totalBudget = budgetSessionBeanLocal.getTotalBudget(tripId);
            return Response.status(200).entity(totalBudget).build();
        } 
        catch (TripNotFoundException ex)
        {
            JsonObject exception = Json.createObjectBuilder()
                    .add("error", ex.getMessage())
                    .build();
            return Response.status(404).entity(exception).build();
        }
        catch (IllegalArgumentException ex)
        {
            JsonObject exception = Json.createObjectBuilder()
                    .add("error", ex.getMessage())
                    .build();
            return Response.status(400).entity(exception).build();
        }
    }

    @POST
    @Path("{tripId}/expense")
    @Consumes(MediaType.APPLICATION_JSON)
    @Produces(MediaType.APPLICATION_JSON)
    public Response addExpense(@PathParam("tripId") Long tripId, Expense expense) 
    {
        try 
        {
            expenseSessionBeanLocal.addExpense(tripId, expense);
            return Response.status(204).build();
        } 
        catch (TripNotFoundException | CategoryNotFoundException ex) 
        {
            JsonObject exception = Json.createObjectBuilder()
                    .add("error", ex.getMessage())
                    .build();
            return Response.status(404).entity(exception).build();
        }
    }

    @DELETE
    @Path("{tripId}/expense/{expenseId}")
    @Produces(MediaType.APPLICATION_JSON)
    public Response deleteExpense(@PathParam("expenseId") Long expenseId, @PathParam("tripId") Long tripId) 
    {
        try 
        {
            expenseSessionBeanLocal.deleteExpense(expenseId, tripId);
            return Response.status(204).build();
        } 
        catch (ExpenseNotFoundException | TripNotFoundException ex) 
        {
            JsonObject exception = Json.createObjectBuilder()
                    .add("error", ex.getMessage())
                    .build();
            return Response.status(404).entity(exception).build();
        }
    }
    
    @GET
    @Path("{tripId}/allExpenses")
    @Produces(MediaType.APPLICATION_JSON)
    public Response getAllExpenses(@PathParam("tripId") Long tripId) 
    {
        try 
        {
            List<Expense> expenses = expenseSessionBeanLocal.getAllExpenses(tripId);
            return Response.status(200).entity(expenses).build();
        } 
        catch (TripNotFoundException ex) 
        {
            JsonObject exception = Json.createObjectBuilder()
                    .add("error", ex.getMessage())
                    .build();
            return Response.status(404).entity(exception).build();
        }
    }

    @GET
    @Path("{tripId}/totalExpenseByCategory")
    @Produces(MediaType.APPLICATION_JSON)
    public Response getTotalExpenseByCategories(@PathParam("tripId") Long tripId) 
    {
        try 
        {
            Map<String, BigDecimal> totalExpense = expenseSessionBeanLocal.getTotalExpenseByCategories(tripId);
            return Response.status(200).entity(totalExpense).build();
        } 
        catch (TripNotFoundException ex) 
        {
            JsonObject exception = Json.createObjectBuilder()
                    .add("error", ex.getMessage())
                    .build();
            return Response.status(404).entity(exception).build();
        }
    }
    
    @GET
    @Path("{tripId}/totalExpenseByCategory/{categoryId}")
    @Produces(MediaType.APPLICATION_JSON)
    public Response getTotalExpenseByCategory(@PathParam("tripId") Long tripId, @PathParam("categoryId") Long categoryId) 
    {
        try 
        {
            BigDecimal totalExpense = expenseSessionBeanLocal.getTotalExpenseByCategory(tripId, categoryId);
            return Response.status(200).entity(totalExpense).build();
        } 
        catch (TripNotFoundException | CategoryNotFoundException ex) 
        {
            JsonObject exception = Json.createObjectBuilder()
                    .add("error", ex.getMessage())
                    .build();
            return Response.status(404).entity(exception).build();
        }
        catch (IllegalArgumentException ex)
        {
            JsonObject exception = Json.createObjectBuilder()
                    .add("error", ex.getMessage())
                    .build();
            return Response.status(400).entity(exception).build();
        }
    }    
    
    @GET
    @Path("{tripId}/totalExpense")
    @Produces(MediaType.APPLICATION_JSON)
    public Response getTotalExpense(@PathParam("tripId") Long tripId) 
    {
        try 
        {
            BigDecimal totalExpense = expenseSessionBeanLocal.getTotalExpense(tripId);
            return Response.status(200).entity(totalExpense).build();
        } 
        catch (TripNotFoundException ex)
        {
            JsonObject exception = Json.createObjectBuilder()
                    .add("error", ex.getMessage())
                    .build();
            return Response.status(404).entity(exception).build();
        }
        catch (IllegalArgumentException ex)
        {
            JsonObject exception = Json.createObjectBuilder()
                    .add("error", ex.getMessage())
                    .build();
            return Response.status(400).entity(exception).build();
        }
    }

    @GET
    @Path("{tripId}/totalExpense/user/{userId}")
    @Produces(MediaType.APPLICATION_JSON)
    public Response getTotalExpenseByUser(@PathParam("userId") Long userId, @PathParam("tripId") Long tripId) 
    {
        try 
        {
            BigDecimal totalExpense = expenseSessionBeanLocal.getTotalExpenseByUser(userId, tripId);
            return Response.status(200).entity(totalExpense).build();
        } 
        catch (TripNotFoundException ex)
        {
            JsonObject exception = Json.createObjectBuilder()
                    .add("error", ex.getMessage())
                    .build();
            return Response.status(404).entity(exception).build();
        }
        catch (IllegalArgumentException ex)
        {
            JsonObject exception = Json.createObjectBuilder()
                    .add("error", ex.getMessage())
                    .build();
            return Response.status(400).entity(exception).build();
        }
    }
    
    @GET
    @Path("{tripId}/debts/user/{userId}")
    @Produces(MediaType.APPLICATION_JSON)
    public Response getDebtsByUser(@PathParam("userId") Long userId, @PathParam("tripId") Long tripId) 
    {
        try 
        {
            List<Debt> debts = debtSessionBeanLocal.getDebtsByUser(userId, tripId);
            GenericEntity<List<Debt>> entity = new GenericEntity<List<Debt>>(debts) {};
            return Response.status(200).entity(entity).build();
        } 
        catch (TripNotFoundException | UserNotFoundException ex) 
        {
            JsonObject exception = Json.createObjectBuilder()
                    .add("error", ex.getMessage())
                    .build();
            return Response.status(404).entity(exception).build();
        }
        catch (IllegalArgumentException ex)
        {
            JsonObject exception = Json.createObjectBuilder()
                    .add("error", ex.getMessage())
                    .build();
            return Response.status(400).entity(exception).build();
        }
    }
    
    @GET
    @Path("{tripId}/owedDebts/user/{userId}")
    @Produces(MediaType.APPLICATION_JSON)
    public Response getDebtsOwedByUser(@PathParam("userId") Long userId, @PathParam("tripId") Long tripId) 
    {
        try 
        {
            List<Debt> debts = debtSessionBeanLocal.getDebtsOwedByUser(userId, tripId);
            GenericEntity<List<Debt>> entity = new GenericEntity<List<Debt>>(debts) {};
            return Response.status(200).entity(entity).build();
        } 
        catch (TripNotFoundException | UserNotFoundException ex) 
        {
            JsonObject exception = Json.createObjectBuilder()
                    .add("error", ex.getMessage())
                    .build();
            return Response.status(404).entity(exception).build();
        }
        catch (IllegalArgumentException ex)
        {
            JsonObject exception = Json.createObjectBuilder()
                    .add("error", ex.getMessage())
                    .build();
            return Response.status(400).entity(exception).build();
        }
    }
    
    @GET
    @Path("{tripId}/debts")
    @Produces(MediaType.APPLICATION_JSON)
    public Response getOverallDebts(@PathParam("tripId") Long tripId) 
    {
        try 
        {
            List<Debt> debts = debtSessionBeanLocal.getOverallDebts(tripId);
            GenericEntity<List<Debt>> entity = new GenericEntity<List<Debt>>(debts) {};
            return Response.status(200).entity(entity).build();
        } 
        catch (TripNotFoundException ex) 
        {
            JsonObject exception = Json.createObjectBuilder()
                    .add("error", ex.getMessage())
                    .build();
            return Response.status(404).entity(exception).build();
        }
        catch (IllegalArgumentException ex)
        {
            JsonObject exception = Json.createObjectBuilder()
                    .add("error", ex.getMessage())
                    .build();
            return Response.status(400).entity(exception).build();
        }
    }
    
    @PUT
    @Path("{tripId}/payDebt/{debtId}")
    @Produces(MediaType.APPLICATION_JSON)
    public Response payDebt(@PathParam("tripId") Long tripId,
                            @PathParam("debtId") Long debtId,
                            @QueryParam("amt") Long amt) 
    {
        try 
        {
            debtSessionBeanLocal.payDebt(tripId, debtId, amt);
            return Response.status(204).build();
        } 
        catch (TripNotFoundException ex) 
        {
            JsonObject exception = Json.createObjectBuilder()
                    .add("error", ex.getMessage())
                    .build();
            return Response.status(404).entity(exception).build();
        }
    }
}