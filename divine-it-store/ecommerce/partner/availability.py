from oscar.apps.partner import availability as base_availability


class RequirementNotMeet(base_availability.Base):
    can_purchase = False
    reason = ''

    def __init__(self, reason):
        super().__init__()
        self.reason = reason

    def is_purchase_permitted(self, quantity):
        return self.can_purchase, self.reason
