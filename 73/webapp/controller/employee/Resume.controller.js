sap.ui.define([
	"sap/ui5/walkthrough/controller/BaseController",
	"sap/ui/model/json/JSONModel"
], function (BaseController, JSONModel) {
	"use strict";
	var _aValidTabKeys = ["Info", "Projects", "Hobbies", "Notes"];

	return BaseController.extend("sap.ui5.walkthrough.controller.employee.Resume", {
		onInit: function () {
			var oRouter = this.getRouter();

			this.getView().setModel(new JSONModel(), "view");
			oRouter.getRoute("employeeResume").attachMatched(this._onRouteMatched, this);
		},
		_onRouteMatched : function (oEvent) {
			var oArgs, oView, oQuery;

			oArgs = oEvent.getParameter("arguments");
			oView = this.getView();
			oView.bindElement({
				path : "/Employees(" + oArgs.employeeId + ")",
				events : {
					change: this._onBindingChange.bind(this)
				}
			});

			oQuery = oArgs["?query"];
			if (oQuery && _aValidTabKeys.indexOf(oQuery.tab) > -1){
				oView.getModel("view").setProperty("/selectedTabKey", oQuery.tab);
			} else {
				this.getRouter().navTo("employeeResume", {
					employeeId : oArgs.employeeId,
					"?query": {
						tab : _aValidTabKeys[0]
					}
				}, true /*no history*/);
			}
		},
		_onBindingChange : function (oEvent) {
			if (!this.getView().getBindingContext()) {
				this.getRouter().getTargets().display("notFound");
			}
		},
		onTabSelect : function (oEvent){
			var oCtx = this.getView().getBindingContext();

			this.getRouter().navTo("employeeResume", {
				employeeId : oCtx.getProperty("EmployeeID"),
				"?query": {
					tab : oEvent.getParameter("selectedKey")
				}
			}, true /*without history*/);
		}
	});
});
