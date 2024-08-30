# Copyright (c) 2024, Telepathy and contributors
# For license information, please see license.txt

# import frappe
from frappe.model.document import Document


class ExpensesRecord(Document):
    def before_save(self):
        self.formatted_amount = self.amount if self.type == "credit" else -self.amount
